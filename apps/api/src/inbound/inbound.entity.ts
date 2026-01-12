import { OrderEntity } from "../orders/orders.entity";
import { SupplierEntity } from "../suppliers/suppliers.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'inbounds' })
export class InboundEntity {
    // Define your entity columns and relations here
    @PrimaryGeneratedColumn('uuid')
    id_inbound: string;

    @Column({ unique: true })
    inbound_number: string;

    @ManyToOne(() => OrderEntity)
    @JoinColumn( { name: 'id_po' } )
    purchase_order: OrderEntity;


    @ManyToOne(() => UserEntity)
    @JoinColumn( { name: 'id_user' } )
    received_by: UserEntity;

    @Column()
    received_at: Date;

    @ManyToOne(() => SupplierEntity)
    @JoinColumn({ name: 'id_supplier' })
    supplier_name: SupplierEntity;

    @Column()
    total_items: number;

    @Column()
    status: string;

    @Column({ nullable: true })
    note: string;
}