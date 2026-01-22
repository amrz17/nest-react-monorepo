import { OrderEntity } from "../entities/orders.entity";

export type IOrder = Omit<OrderEntity, 'id_user'>;