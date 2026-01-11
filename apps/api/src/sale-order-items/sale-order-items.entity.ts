import { ItemEntity } from "../items/items.entity";
import { SalesOrderEntity } from "../sales-orders/sales-order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity( { name: 'sale_order_items' } )
export class SaleOrderItemsEntity {
    // Define your entity columns and relations here
    @PrimaryGeneratedColumn('uuid')
    id_soi: string;

    @ManyToOne(() => SalesOrderEntity, (salesOrder) => salesOrder.items)
    @JoinColumn({ name: 'id_so' })
    sales_order: SalesOrderEntity;

    @ManyToOne(() => ItemEntity)
    @JoinColumn({ name: 'id_item' })
    item: ItemEntity;

    @Column({ type: 'int' })
    qty_ordered: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price_at_order: number;

    @UpdateDateColumn()
    last_updated: Date;

    @CreateDateColumn()
    created_at: Date;
}
