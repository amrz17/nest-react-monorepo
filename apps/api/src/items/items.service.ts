import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ItemsEntity } from './items.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { IItemResponse } from './types/itemsResponse.interface';
import { UpdateItemDto } from './dto/update-item.dto';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';
import { DataSource } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsEntity)
    private readonly itemRepository: Repository<ItemsEntity>,
    private readonly activityLogsService: ActivityLogsService,
    private readonly dataSource: DataSource
  ) {}

  // Get All Items
  async getAllItems(): Promise<ItemsEntity[]> {
    return this.itemRepository.find({
      order: {
        created_at: 'DESC'
      }
    })
  }

  // Create Item
  async createItem(
    createItemDto: CreateItemDto,
    userId: string
): Promise<ItemsEntity> {
    // const newItem = new ItemsEntity();
    // Object.assign(newItem, createItemDto);

    // return this.itemRepository.save(newItem);

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
          // inisialisasi dan simpan inventory
          const newItem = queryRunner.manager.create(ItemsEntity, {
              ...createItemDto,
          });

          const savedItem = queryRunner.manager.save(newItem);            

          // simpan logs
          await this.activityLogsService.createLogs(queryRunner.manager, {
              id_user: userId,
              action: 'CREATE',
              module: "ITEM",
              resource_id: (await savedItem).id_item,
              description: `${(await savedItem).name}`,
              metadata: {
                  sku: (await savedItem).sku,
                  name: (await savedItem).name,
                  description: (await savedItem).description,
                  price: (await savedItem).price,
              }
          })

          await queryRunner.commitTransaction();
          return savedItem;
      } catch (error) {
          await queryRunner.rollbackTransaction();
          throw error;
      } finally {
          await queryRunner.release()
      }

  }

  // Edit Item
  async updateItem(
    id_item: string,
    updateItemDto: UpdateItemDto,
    userId: string
): Promise<ItemsEntity> {
    // const item = await this.itemRepository.findOne({ where: { id_item }})

    // if (!item) {
    //   throw new NotFoundException('Item not found');
    // }

    // Object.assign(item, updateItemDto);

    // return this.itemRepository.save(item);

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
          // data lama
          const oldItem = await queryRunner.manager.findOne(ItemsEntity, {
              where: { id_item },
          });

          if (!oldItem) {
              throw new NotFoundException('Item Not Found!')
          }

          // Snapshot data lama secara eksplisit
          const before = {
              ...oldItem
          };

          // update data
          Object.assign(oldItem, updateItemDto);

          const updateItem = await queryRunner.manager.save(oldItem);

          // save log
          await this.activityLogsService.createLogs(queryRunner.manager, {
              id_user: userId,
              action: 'UPDATE',
              module: 'ITEM',
              resource_id: id_item,
              description: `${oldItem.name}`,
              metadata: {
                  before: before,
                  after: {
                    sku: updateItemDto.sku,
                    name: updateItemDto.name,
                    description: updateItemDto.description,
                    price: updateItemDto.price,
                  }
              }
          });

          await queryRunner.commitTransaction();
          return updateItem;

      } catch (error) {
          await queryRunner.rollbackTransaction();
          throw error; 
      } finally {
          await queryRunner.release();
      }

  }

  // Delete Item
  async deleteItem(
    id_item: string,
    userId: string
): Promise<void> {
    // await this.itemRepository.delete({ id_item })
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
          // find data
          const item = await queryRunner.manager.findOne(ItemsEntity, { 
              where: { id_item } 
          });

          if (!item) {
              throw new NotFoundException('Item Not Found!');
          }

          // delete data
          await queryRunner.manager.delete(ItemsEntity, { id_item });

          // save log
          await this.activityLogsService.createLogs(queryRunner.manager, {
              id_user: userId,
              action: 'DELETE',
              module: 'ITEM',
              resource_id: id_item,
              description: `${item.name}`,
              metadata: { 
                  deleted_data: item, // Menyimpan seluruh object yang dihapus
                  deleted_at: new Date()
              }
          });

          await queryRunner.commitTransaction();
      } catch (error) {
          await queryRunner.rollbackTransaction();
          throw error;
      } finally {
          await queryRunner.release();
      }
  }

  generatedItemResponse(
    item: ItemsEntity | ItemsEntity[],
  ): IItemResponse {
    return {
      success: true,
      items: item,
    };
  }
}
