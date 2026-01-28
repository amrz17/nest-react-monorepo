import { ICustomer } from "./customer.type";

export interface ICustomerResponse {
    success?: boolean;
    message?: string;
    customers?: ICustomer | ICustomer[];
}