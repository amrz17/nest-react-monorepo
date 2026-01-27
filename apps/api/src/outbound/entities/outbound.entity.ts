import { CustomerEntity } from "../../customers/customer.entity";
import { SalesOrderEntity } from "../../sales/entities/sales-order.entity";
import { UserEntity } from "../../user/user.entity";
import { OutboundItemEntity } from "./outbound-item.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum StatusOutbound {
    OPEN = "OPEN",
    PICKING = "PICKING",
    PACKING = "PACKING",
    SHIPPED = "SHIPPED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED"
}

@Entity({ name: 'outbound' })
export class OutboundEntity {
    // Define your entity columns and relations here
    @PrimaryGeneratedColumn('uuid')
    id_outbound: string;

    @Column({ unique: true })
    outbound_number: string;

    @Column()
    id_so: string;
    @ManyToOne(() => SalesOrderEntity)
    @JoinColumn( { name: 'id_so' } )
    sales_order: SalesOrderEntity;

    @Column()
    id_user: string;
    @ManyToOne(() => UserEntity)
    @JoinColumn( { name: 'id_user' } )
    shipped_by: UserEntity;

    @Column()
    id_customer: string;
    @ManyToOne(() => CustomerEntity)
    @JoinColumn( { name: 'id_customer' } )
    customer: UserEntity;

    @Column()
    shipped_at: Date;

    @Column()
    carrier_name: string;

    @Column()
    tracking_number: string;

    @Column()
    total_items: number;

    @Column({
        type: 'enum',
        enum: StatusOutbound,
        default: StatusOutbound.OPEN,
        nullable: false
    })
    status_outbound: StatusOutbound;

    @Column({ nullable: true })
    note: string;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => OutboundItemEntity, (outboundItem) => outboundItem.outbound)
    @JoinColumn({ name: 'id_outbound_item' })
    items: OutboundItemEntity[];

}