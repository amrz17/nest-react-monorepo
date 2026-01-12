import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    sku: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;
}