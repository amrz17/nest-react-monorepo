import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRole } from "../user.entity";


export class CreateUserDto {
    @IsNotEmpty()
     full_name: string;

    @IsNotEmpty()
     username: string;

    @IsEmail()
     email: string;

    @IsNotEmpty()
     password: string;

    @IsNotEmpty()
     role: UserRole;
}