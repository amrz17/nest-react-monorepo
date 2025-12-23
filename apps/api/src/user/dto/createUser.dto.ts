import { IsEmail, IsNotEmpty } from "class-validator";

export enum UserRole {
    ADMIN = "admin",
    STAFF = "staff",
    CUSTOMER = "customer",
}

export class CreateUserDto {
    @IsNotEmpty()
     name: string;

    @IsNotEmpty()
     username: string;

    @IsEmail()
     email: string;

    @IsNotEmpty()
     password: string;

    @IsNotEmpty()
     role: UserRole;
}