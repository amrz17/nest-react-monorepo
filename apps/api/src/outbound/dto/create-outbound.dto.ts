import { IsArray, IsDate, IsDateString, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { StatusOutbound } from "../entities/outbound.entity";
import { Type } from "class-transformer";
import { CreateOutboundItemDto } from "./create-ouboundItem.dto";

export class CreateOutbounddDto {
    @IsString()
    outbound_number: string;

    @IsUUID()
    id_so: string;

    @IsUUID()
    id_user: string;

    @IsUUID()
    id_customer: string;

    @IsDateString()
    shipped_at: string;

    @IsString()
    carrier_name: string;

    @IsString()
    tracking_number: string;

    @IsString()
    status_inbound: StatusOutbound;

    @IsOptional()
    @IsString()
    note: string;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOutboundItemDto)
    items: CreateOutboundItemDto[];
}