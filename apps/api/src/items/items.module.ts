import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsEntity } from './items.entity';
import { InventoryEntity } from '../inventory/inventory.entity';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        ItemsEntity,
        InventoryEntity,
    ])],
    controllers: [ItemsController],
    providers: [ItemsService],
    exports: [ItemsService]
})
export class ItemsModule {}
