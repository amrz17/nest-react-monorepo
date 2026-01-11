import { InventoryEntity } from "../inventory/inventory.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'items'})
export class ItemEntity {
    // Define item properties here
    @PrimaryGeneratedColumn('uuid')
    id_item: string;

    @Column({ unique: true })
    sku: string;

    @Column()
    name: string;

    @Column('text', { nullable: true })
    description?: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => InventoryEntity, (inventory) => inventory.item) 
    inventories: InventoryEntity[];

    @CreateDateColumn()
    created_at: Date;
}