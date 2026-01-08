import { IOrder } from "./order.type";

export class IOrdersResponse {
    success?: boolean;
    message?: string;
    data?: {
        order: IOrder | IOrder[];
        total?: number;
    };
}