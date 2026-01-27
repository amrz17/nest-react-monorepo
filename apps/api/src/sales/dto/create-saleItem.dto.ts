import { IsNumber, IsUUID } from "class-validator";

export class CreateSaleItemDto {
    @IsUUID()
    id_so: string;

    @IsUUID()
    id_item: string;

    @IsNumber()
    qty_ordered: number;

    @IsNumber()
    price_at_order: number;
}