import { PurchaseOrderItemsEntity } from "../entities/order-items.entity";

export type IPOItem = Omit<PurchaseOrderItemsEntity, 'id_poi'>