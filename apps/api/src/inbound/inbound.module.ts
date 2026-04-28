import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InboundController } from './inbound.controller';
import { InboundService } from './inbound.service';
import { InboundEntity } from './entities/inbound.entity';
import { InboundItemEntity } from './entities/inbound-item.entity';
import { PurchaseOrderItemsEntity } from '../orders/entities/order-items.entity';
import { ItemsEntity } from '../items/items.entity';
import { UserEntity } from '../user/user.entity';
import { OrderEntity } from '../orders/entities/orders.entity';
import { ActivityLogsModule } from '../activity-logs/activity-logs.module';

@Module({
    imports: [TypeOrmModule.forFeature([
        InboundEntity,
        InboundItemEntity,
        OrderEntity,
        PurchaseOrderItemsEntity,
        ItemsEntity,
        UserEntity,
    ]),
        ActivityLogsModule
    ],
    controllers: [InboundController],
    providers: [InboundService],
})
export class InboundModule {}
