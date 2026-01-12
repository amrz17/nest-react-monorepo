import { Module } from '@nestjs/common';
import { SaleOrderItemsService } from './sale-order-items.service';
import { SaleOrderItemsController } from './sale-order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleOrderItemsEntity } from './sale-order-items.entity';
import { SalesOrderEntity } from '../sales/sales-order.entity';
import { ItemsEntity } from '../items/items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    SalesOrderEntity,
    SaleOrderItemsEntity,
    ItemsEntity
  ])],
  providers: [SaleOrderItemsService],
  controllers: [SaleOrderItemsController]
})
export class SaleOrderItemsModule {}
