import { PurchaseOrderItemsEntity } from "../order-items.entity";

export type IPOItem = Omit<PurchaseOrderItemsEntity, 'id_poi'>