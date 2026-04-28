import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/orders.entity';
import { SupplierEntity } from '../suppliers/suppliers.entity';
import { PurchaseOrderItemsEntity } from './entities/order-items.entity';
import { UserEntity } from '../user/user.entity';
import { InboundEntity } from '../inbound/entities/inbound.entity';
import { ActivityLogsModule } from '../activity-logs/activity-logs.module';
import { ItemsEntity } from '../items/items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    OrderEntity,
    UserEntity,
    SupplierEntity,
    PurchaseOrderItemsEntity,
    InboundEntity,
    ItemsEntity
  ]),
    ActivityLogsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}