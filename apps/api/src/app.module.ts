import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { OrdersModule } from './purchase-orders/orders.module';
import { InventoryModule } from './inventory/inventory.module';
import { InboundController } from './inbound/inbound.controller';
import { InboundService } from './inbound/inbound.service';
import { InboundModule } from './inbound/inbound.module';
import { OutboundModule } from './outbound/outbound.module';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
import { LocationsModule } from './locations/locations.module';
import { SalesController } from './sales-orders/sales.controller';
import { SalesService } from './sales-orders/sales.service';
import { PurchaseOrderItemsService } from './purchase-order-items/purchase-order-items.service';
import { PurchaseOrderItemsController } from './purchase-order-items/purchase-order-items.controller';
import { PurchaseOrderItemsModule } from './purchase-order-items/purchase-order-items.module';
import { SaleOrderItemsModule } from './sale-order-items/sale-order-items.module';
import { SaleOrderItemsController } from './sale-order-items/sale-order-items.controller';
import { SaleOrderItemsService } from './sale-order-items/sale-order-items.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    // Connect to database
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity.{ts, js}'],
        migrationsTableName: 'migrations',
        migrations: [__dirname + '/migrations/**/*.ts'],
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    UserModule,
    OrdersModule,
    InventoryModule,
    InboundModule,
    OutboundModule,
    ItemsModule,
    LocationsModule,
    PurchaseOrderItemsModule,
    SaleOrderItemsModule,
    CustomersModule,
    SuppliersModule
  ],
  controllers: [AppController, InboundController, ItemsController, SalesController, PurchaseOrderItemsController, SaleOrderItemsController, CustomersController],
  providers: [AppService, InboundService, ItemsService, SalesService, PurchaseOrderItemsService, SaleOrderItemsService],
})
export class AppModule {}
