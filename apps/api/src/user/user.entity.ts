import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

export enum UserRole {
    ADMIN = "admin",
    STAFF = "staff",
    CUSTOMER = "customer",
}

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id_user: number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        length: 50,
        unique: true,
        nullable: false
    })
    username: string;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        if(this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CUSTOMER,
        nullable: false
    })
    role: UserRole;

    @CreateDateColumn({
        type: "timestamp"
    })
    created_at: Date;

}