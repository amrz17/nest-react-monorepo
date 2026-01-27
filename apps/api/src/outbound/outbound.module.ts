import { Module } from '@nestjs/common';
import { OutboundService } from './outbound.service';
import { OutboundController } from './outbound.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboundEntity } from './entities/outbound.entity';
import { SalesOrderEntity } from '../sales/entities/sales-order.entity';
import { UserEntity } from '../user/user.entity';
import { SaleOrderItemsEntity } from '../sales/entities/sale-order-items.entity';
import { ItemsEntity } from '../items/items.entity';
import { CustomerEntity } from '../customers/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    OutboundEntity,
    SalesOrderEntity,
    UserEntity,
    SaleOrderItemsEntity,
    ItemsEntity,
    CustomerEntity,
  ])],
  providers: [OutboundService],
  controllers: [OutboundController]
})
export class OutboundModule {}
