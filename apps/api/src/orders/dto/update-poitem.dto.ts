import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdatePOIDto {
    @IsUUID()
    @IsString()
    readonly id_po: string;    

    @IsUUID()
    @IsString()
    readonly id_item: string;

    @IsNumber()
    readonly qty_ordered: number;

    @IsNumber()
    readonly price_per_unit: number;

    @IsNumber()
    readonly qty_received: number;

    @IsNumber()
    readonly total_price: number;
}