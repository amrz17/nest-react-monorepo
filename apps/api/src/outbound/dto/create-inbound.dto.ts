import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInboundDto {
    @IsString()
    outbound_number: string;

    @IsDate()
    shipped_at: Date;

    @IsString()
    carrier_name: string;

    @IsString()
    tracking_number: string;

    @IsNumber()
    total_items: number;

    @IsOptional()
    @IsString()
    note: string;
}