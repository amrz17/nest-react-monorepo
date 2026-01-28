import { CustomerEntity } from "../customer.entity";

export type ICustomer = Omit<CustomerEntity, 'id_customer'>
