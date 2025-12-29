import { IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    readonly name: string;
    readonly username: string;
    readonly email: string;
    readonly role: string;
}