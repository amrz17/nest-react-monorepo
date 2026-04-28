import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './locations.entity';
import { LocationSeedService } from '../seeds/data.seed.service';
import { ActivityLogsModule } from '../activity-logs/activity-logs.module';
import { UserEntity } from '../user/user.entity';
import { ItemsEntity } from '../items/items.entity';
import { SupplierEntity } from '../suppliers/suppliers.entity';
import { CustomerEntity } from '../customers/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    LocationEntity,
    UserEntity,
    ItemsEntity,
    SupplierEntity,
    CustomerEntity
  ]),
    ActivityLogsModule
  ],
  providers: [LocationsService, LocationSeedService],
  controllers: [LocationsController]
})
export class LocationsModule {}
