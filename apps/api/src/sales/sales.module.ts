import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrderEntity } from './entities/sales-order.entity';
import { SaleOrderItemsEntity } from './entities/sale-order-items.entity';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { UserEntity } from '../user/user.entity';
import { CustomerEntity } from '../customers/customer.entity';
import { ActivityLogsModule } from '../activity-logs/activity-logs.module';
import { OutboundEntity } from '../outbound/entities/outbound.entity';
import { ItemsEntity } from '../items/items.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        SalesOrderEntity,
        SaleOrderItemsEntity,
        UserEntity,
        CustomerEntity,
        OutboundEntity,
        ItemsEntity
    ]),
        ActivityLogsModule
    ],
    providers: [SalesService],
    controllers: [SalesController]
})
export class SalesModule {}
