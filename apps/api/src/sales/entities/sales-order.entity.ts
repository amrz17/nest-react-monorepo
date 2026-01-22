import { CustomerEntity } from "../../customers/customer.entity";
import { SaleOrderItemsEntity } from "./sale-order-items.entity";
import { UserEntity } from "../../user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum SalesOrderStatus {
  PENDING = 'PENDING',     // Pesanan baru masuk dari customer/sales
  APPROVED = 'APPROVED',   // Pembayaran ok, siap di-picking (diambil dari rak)
  PICKING = 'PICKING',     // Petugas gudang sedang mengambil barang
  SHIPPED = 'SHIPPED',     // Barang sudah dibawa kurir, stok resmi berkurang
  CANCELED = 'CANCELED',   // Customer batal beli
  COMPLETED = 'COMPLETED', // Barang sudah dikonfirmasi sampai di customer
}

@Entity({ name: 'sales_orders' })
export class SalesOrderEntity {
    // Define your entity columns and relations here
    @PrimaryGeneratedColumn('uuid')
    id_so: string;

    @Column({ unique: true })
    so_number: string;

    @Column({
        type: "enum",
        enum: SalesOrderStatus,
        default: SalesOrderStatus.PENDING,
        nullable: false
    })
    so_status: SalesOrderStatus;
    
    @Column()
    date_so: Date;

    @ManyToOne(() => CustomerEntity)
    @JoinColumn( { name: 'id_customer' } )
    customer: UserEntity;

    @Column()
    customer_address: string;

    @Column()
    customer_phone: string;

    @Column()
    total_amount: number;

    @Column()
    status: string;

    @Column()
    note: string;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => SaleOrderItemsEntity, (item) => item.sales_order, { cascade: true })
    items: SaleOrderItemsEntity[];
}