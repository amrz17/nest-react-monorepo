import { PurchaseOrderItemsEntity } from "../purchase-order-items/order-items.entity";
import { SupplierEntity } from "../suppliers/suppliers.entity";
import { UserEntity } from "../user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum PurchaseOrderStatus {
  PENDING = 'PENDING',     // Baru dibuat, menunggu persetujuan manager
  APPROVED = 'APPROVED',   // Sudah oke, sudah dikirim ke supplier
  SHIPPED = 'SHIPPED',     // Supplier sudah kirim, barang di jalan
  RECEIVED = 'RECEIVED',   // Barang sudah sampai di gudang & di-input ke stok
  CANCELED = 'CANCELED',   // Batal beli
  COMPLETED = 'COMPLETED', // Selesai (Administrasi & stok sudah sinkron)
}

@Entity({name: 'purchase_orders'})
export class OrderEntity {
    // Define order entity columns and relations here
    @PrimaryGeneratedColumn('uuid')
    id_po: string;

    @ManyToOne(() => UserEntity)
    created_by: UserEntity;

    @Column({ unique: true })
    po_number: string;

    @ManyToOne(() => SupplierEntity, (supplier) => supplier.purchase_order)
    @JoinColumn({ name: 'id_supplier' })
    supplier: SupplierEntity;

    @OneToMany(() => PurchaseOrderItemsEntity, (item) => item.purchaseOrder, { cascade: true })
    items: PurchaseOrderItemsEntity[];

    @Column({ type: 'date', nullable: true })
    expected_delivery_date: Date;

    @Column({
        type: "enum",
        enum: PurchaseOrderStatus,
        default: PurchaseOrderStatus.PENDING,
        nullable: false
    })
    po_status: PurchaseOrderStatus;

    @Column()
    note: string;

    @UpdateDateColumn()
    last_updated: Date;

    @CreateDateColumn({
        type: "timestamp"
    })
    created_at: Date;
}