import { Module } from '@nestjs/common';
import { SaleOrderItemsService } from './sale-order-items.service';
import { SaleOrderItemsController } from './sale-order-items.controller';

@Module({
  providers: [SaleOrderItemsService],
  controllers: [SaleOrderItemsController]
})
export class SaleOrderItemsModule {}
