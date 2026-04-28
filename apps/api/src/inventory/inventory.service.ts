import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from './inventory.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { IInventory } from './types/inventory.type';
import { IInventoryResponse } from './types/inventoryResponse.interface';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ActivityLogsService  } from '../activity-logs/activity-logs.service';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryEntity)
        private readonly inventoryRepository: Repository<InventoryEntity>,
        private readonly dataSource: DataSource,
        private readonly activityLogsService: ActivityLogsService
    ) {}

    // get all
    async getAllInventory(): Promise<InventoryEntity[]> {
        return this.inventoryRepository.find({
            relations: ['item', 'location']
        })
    }

    // create Inventory
    async createInventory(
        createInventoryDto: CreateInventoryDto,
        userId: string
    ): Promise<InventoryEntity> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // inisialisasi dan simpan inventory
            const newInventory = queryRunner.manager.create(InventoryEntity, {
                ...createInventoryDto,
                id_user: userId
            });

            const savedInventory = await queryRunner.manager.save(newInventory);            

            const inventoryWithRelations = await queryRunner.manager.findOne(InventoryEntity, {
                where: { id_inventory: savedInventory.id_inventory },
                relations: ['item', 'location'],
            });

            if (!inventoryWithRelations) {
                throw new Error('Inventory not found after save');
            }

            // simpan logs
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: userId,
                action: 'CREATE',
                module: "INVENTORY",
                resource_id: savedInventory.id_inventory,
                description: `For item: ${inventoryWithRelations.item.name}, at: ${inventoryWithRelations.location.bin_code}`,
                metadata: {
                    initial_qty: savedInventory.qty_available,
                    initial_reserved: savedInventory.qty_reserved,
                    initial_ordered: savedInventory.qty_ordered,
                }
            })

            await queryRunner.commitTransaction();
            return savedInventory;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release()
        }

    }

    // update Inventory
    async updateInventory(
        id_inventory: string,
        updateInventroyDto: UpdateInventoryDto,
        userId: string
    ): Promise<InventoryEntity> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // data lama
            const oldInventory = await queryRunner.manager.findOne(InventoryEntity, {
                where: { id_inventory },
                relations: ['item', 'location']
            });

            if (!oldInventory) {
                throw new NotFoundException('Inventory Not Found!')
            }

            // Snapshot data lama secara eksplisit
            const before = {
                ...oldInventory
            };

            // update data
            Object.assign(oldInventory, updateInventroyDto);

            const updateInventory = await queryRunner.manager.save(oldInventory);

            // save log
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: userId,
                action: 'UPDATE',
                module: 'INVENTORY',
                resource_id: id_inventory,
                description: `Update inventory item: ${oldInventory.item.name}`,
                metadata: {
                    before: before,
                    after: {
                        id_item: updateInventory.id_item,
                        id_location: updateInventory.id_location,
                        qty_available: updateInventory.qty_available,
                        qty_reserved: updateInventory.qty_reserved,
                        qty_ordered: updateInventory.qty_ordered,
                    }
                }
            });

            await queryRunner.commitTransaction();
            return updateInventory;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error; 
        } finally {
            await queryRunner.release();
        }
    }

    async deleteInventory(
        id_inventory: string,
        userId: string 
    ): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // find data
            const inventory = await queryRunner.manager.findOne(InventoryEntity, { 
                where: { id_inventory },
                relations: ['item', 'location'],
            });

            if (!inventory) {
                throw new NotFoundException('Inventory Not Found!');
            }

            // delete data
            await queryRunner.manager.delete(InventoryEntity, { id_inventory });

            // save log
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: userId,
                action: 'DELETE',
                module: 'INVENTORY',
                resource_id: id_inventory,
                description: `Inventory with item: ${inventory.item.name}`,
                metadata: { 
                    deleted_data: inventory, // Menyimpan seluruh object yang dihapus
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

    // response
    generateResponseInventory(
        inventory: IInventory | IInventory[]
    ): IInventoryResponse {
        return {
            success: true,
            inventory: inventory
        }
    }
}
