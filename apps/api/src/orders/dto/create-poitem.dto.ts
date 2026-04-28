import { IsNumber, IsString, IsUUID, Min } from "class-validator";

export class CreatePOIDto {
    @IsUUID()
    id_item: string;

    @IsNumber()
    @Min(1)
    qty_ordered: number;
}