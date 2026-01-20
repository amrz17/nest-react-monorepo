import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderItemsController } from './purchase-order-items.controller';
import { PurchaseOrderItemsService } from './purchase-order-items.service';
import { PurchaseOrderItemsEntity } from './order-items.entity';
import { OrderEntity } from '../orders/orders.entity';
import { ItemsEntity } from '../items/items.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        PurchaseOrderItemsEntity,
        OrderEntity,
        ItemsEntity
    ])],
    controllers: [PurchaseOrderItemsController],
    providers: [PurchaseOrderItemsService]
})
export class PurchaseOrderItemsModule {}
