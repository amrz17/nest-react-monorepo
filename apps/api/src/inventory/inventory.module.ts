import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntity } from './inventory.entity';
import { ItemsEntity } from '../items/items.entity';
import { LocationEntity } from '../locations/locations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    InventoryEntity,
    ItemsEntity,
    LocationEntity,
  ])],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
