import { InventoryEntity } from "../inventory/inventory.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'locations'})
export class LocationEntity {
    // Define location properties here
    @PrimaryGeneratedColumn('uuid')
    id_location: string;

    @Column({ unique: true })
    bin_code: string;

    @Column('text', { nullable: true })
    description?: string;

    @OneToMany(() => InventoryEntity, (inventory) => inventory.location)
    inventories: InventoryEntity[];

    @CreateDateColumn()
    created_at: Date;
}