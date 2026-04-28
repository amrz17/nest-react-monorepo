import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSaleItemDto {
    @IsUUID()
    id_item: string;

    @IsNumber()
    qty_ordered: number;

    @IsNumber()
    qty_shipped: number;
}