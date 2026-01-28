import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { SalesOrderEntity } from '../sales/entities/sales-order.entity';
import { OutboundEntity } from '../outbound/entities/outbound.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    CustomerEntity,
    SalesOrderEntity,
    OutboundEntity
  ])],
  controllers: [CustomersController],
  providers: [CustomersService],

})
export class CustomersModule {}
