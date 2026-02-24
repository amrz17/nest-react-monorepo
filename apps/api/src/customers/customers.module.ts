import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { SalesOrderEntity } from '../sales/entities/sales-order.entity';
import { OutboundEntity } from '../outbound/entities/outbound.entity';
import { ActivityLogsModule } from '../activity-logs/activity-logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    CustomerEntity,
    SalesOrderEntity,
    OutboundEntity
  ]),
    ActivityLogsModule
  ],
  controllers: [CustomersController],
  providers: [CustomersService],

})
export class CustomersModule {}
