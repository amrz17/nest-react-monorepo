import { Module } from "@nestjs/common";
import { UserContainerOptions } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserContainerOptions],
    providers: [UserService],
})
export class UserModule {
}