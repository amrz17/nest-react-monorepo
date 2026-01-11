import { ItemEntity } from "../items/items.entity";
import { OrderEntity } from "../purchase-orders/orders.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'purchase_order_items' })
export class PurchaseOrderItemsEntity {
  // Define your entity columns and relations here
    @PrimaryGeneratedColumn('uuid')
    id_poi: string;

    @ManyToOne(() => OrderEntity, (purchaseOrder) => purchaseOrder.items)
    purchaseOrder: OrderEntity;

    @ManyToOne(() => ItemEntity)
    item: ItemEntity;

    @Column()
    qty_ordered: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price_per_unit: number;

    @Column({ default: 0 })
    qty_received: number;

    @Column('decimal', { precision: 10, scale: 2 })
    total_price: number;

}