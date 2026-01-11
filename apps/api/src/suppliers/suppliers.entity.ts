import { OrderEntity } from "../purchase-orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'suppliers'})
export class SupplierEntity {
    @PrimaryGeneratedColumn('uuid')
    id_supplier: string;

    @Column({ unique: true })
    name: string; 

    @Column({ type: 'text' })
    suppliers_address: string;

    @Column()
    pic_name: string;

    @OneToMany(() => OrderEntity, (po) => po.supplier)
    purchase_order: OrderEntity[];
}