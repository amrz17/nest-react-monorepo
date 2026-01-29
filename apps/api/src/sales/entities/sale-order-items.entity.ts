import { ItemsEntity } from "../../items/items.entity";
import { SalesOrderEntity } from "./sales-order.entity";
import { OutboundItemEntity } from "../../outbound/entities/outbound-item.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity( { name: 'sale_order_items' } )
export class SaleOrderItemsEntity {
    // Define your entity columns and relations here
    @PrimaryGeneratedColumn('uuid')
    id_soi: string;

    @Column()
    id_so: string;
    @ManyToOne(() => SalesOrderEntity, (salesOrder) => salesOrder.items)
    @JoinColumn({ name: 'id_so' })
    sales_order: SalesOrderEntity;

    @Column()
    id_item: string;
    @ManyToOne(() => ItemsEntity)
    @JoinColumn({ name: 'id_item' })
    item: ItemsEntity;

    @Column({ type: 'int' })
    qty_ordered: number;

    @Column({ type: 'int' })
    qty_shipped: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price_per_unit: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price : number;

    @UpdateDateColumn()
    last_updated: Date;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => OutboundItemEntity, (outbound) => outbound.SaleItems)
    outboundItem: OutboundItemEntity[];
}
