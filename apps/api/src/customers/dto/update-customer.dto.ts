import { IsString } from "class-validator";

export class UpdateCustomerDto {
    @IsString()
    readonly customer_name: string;

    @IsString()
    readonly customer_address: string;

    @IsString()
    readonly customer_phone: string;
}