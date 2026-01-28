import { IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    customer_name: string;

    @IsString()
    customer_address: string;

    @IsString()
    customer_phone: string;
}