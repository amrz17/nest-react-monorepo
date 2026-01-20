import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreatePOIDto {
    @IsUUID()
    @IsString()
    id_po: string;    

    @IsUUID()
    @IsString()
    id_item: string;

    @IsNumber()
    qty_ordered: number;

    @IsNumber()
    price_per_unit: number;

    @IsNumber()
    qty_received: number;

    @IsNumber()
    total_price: number;
}