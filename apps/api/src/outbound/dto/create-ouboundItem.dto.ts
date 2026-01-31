import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOutboundItemDto {
    @IsOptional()
    @IsUUID()
    id_outbound: string;

    @IsUUID()
    id_soi: string;

    @IsUUID()
    id_item: string;

    @IsNumber()
    qty_shipped: number;
}