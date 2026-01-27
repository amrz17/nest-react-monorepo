import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateSaleItemDto } from "./create-saleItem.dto";

export class CreateSaleOrder {
    @IsString()
    so_number: string;

    @IsString()
    so_status: string;
    
    @IsDate()
    date_so: Date;

    @IsString()
    customer_address: string;

    @IsString()
    customer_phone: string;

    @IsNumber()
    total_amount: number;

    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    note: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSaleItemDto)
    items: CreateSaleItemDto[];
}