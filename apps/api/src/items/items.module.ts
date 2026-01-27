import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsEntity } from './items.entity';
import { InventoryEntity } from '../inventory/inventory.entity';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { OutboundItemEntity } from '../outbound/entities/outbound-item.entity';
import { InboundItemEntity } from '../inbound/entities/inbound-item.entity';
import { PurchaseOrderItemsEntity } from '../orders/entities/order-items.entity';
import { SaleOrderItemsEntity } from '../sales/entities/sale-order-items.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        ItemsEntity,
        InventoryEntity,
        OutboundItemEntity,
        InboundItemEntity,
        PurchaseOrderItemsEntity,
        SaleOrderItemsEntity
    ])],
    controllers: [ItemsController],
    providers: [ItemsService],
    exports: [ItemsService]
})
export class ItemsModule {}
