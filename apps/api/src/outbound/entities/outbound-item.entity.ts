import { SaleOrderItemsEntity } from "../../sales/entities/sale-order-items.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OutboundEntity } from "./outbound.entity";
import { ItemsEntity } from "../../items/items.entity";

@Entity({ name: 'outbound_items' })
export class OutboundItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id_outbound_item: string;

    @Column()
    id_outbound: string;
    @ManyToOne(() => OutboundEntity, (outbound) => outbound.items, { onDelete: 'CASCADE' })    
    @JoinColumn({ name: 'id_outbound'})
    outbound: OutboundEntity;

    @Column()
    id_soi: string;
    @ManyToOne(() => SaleOrderItemsEntity , (saleItem) => saleItem.outboundItem )
    @JoinColumn({ name: 'id_soi' })
    SaleItems: SaleOrderItemsEntity;

    @Column()
    id_item: string;
    @ManyToOne(() => ItemsEntity , (item) => item.outbound )
    @JoinColumn({ name: 'id_item' })
    item: ItemsEntity;

    @Column({ type: 'int' })
    qty_shipped: number;

    @UpdateDateColumn()
    last_update: Date;

    @CreateDateColumn()
    created_at: Date;
}