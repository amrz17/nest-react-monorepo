import { ItemsEntity } from "../items/items.entity";
import { LocationEntity } from "../locations/locations.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({name: 'inventory'})
@Unique(['item', 'location'])
export class InventoryEntity {
    // Define inventory properties here
    @PrimaryGeneratedColumn('uuid')
    id_item: string;

    @ManyToOne(() => ItemsEntity, (item) => item.inventories)
    item: ItemsEntity;

    @ManyToOne(() => LocationEntity, (location) => location.inventories)
    location: LocationEntity;

    @Column({ default: 0 })
    quantity: number;

    @UpdateDateColumn()
    last_updated: Date;

    @CreateDateColumn()
    created_at: Date;

    
}