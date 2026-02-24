import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './suppliers.entity';
import { OrderEntity } from '../orders/entities/orders.entity';
import { InboundEntity } from '../inbound/entities/inbound.entity';
import { ActivityLogsModule } from '../activity-logs/activity-logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    SupplierEntity,
    OrderEntity,
    InboundEntity
  ]),
    ActivityLogsModule
  ],
  providers: [SuppliersService],
  controllers: [SuppliersController]
})
export class SuppliersModule {}
