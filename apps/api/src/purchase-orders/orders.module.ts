import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

// @Module({
//     imports: [TypeOrmModule.forFeature([UserEntity])],
//     controllers: [UserContainerOptions],
//     providers: [UserService],
//     exports: [UserService],
// })