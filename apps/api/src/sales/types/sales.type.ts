import { SalesOrderEntity } from "../entities/sales-order.entity";

export type ISales = Omit<SalesOrderEntity, 'id_so'>;