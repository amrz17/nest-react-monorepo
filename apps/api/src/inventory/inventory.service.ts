import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from './inventory.entity';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { IInventory } from './types/inventory.type';
import { IInventoryResponse } from './types/inventoryResponse.interface';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryEntity)
        private readonly inventoryRepository: Repository<InventoryEntity>
    ) {}

    // get all
    async getAllInventory(): Promise<InventoryEntity[]> {
        return this.inventoryRepository.find({})
    }

    // create Inventory
    async createInventory(createInventoryDto: CreateInventoryDto): Promise<InventoryEntity> {
       const newInventory = new InventoryEntity();
       Object.assign(newInventory, createInventoryDto);

       return this.inventoryRepository.save(newInventory);
    }

    // update Inventory
    async updateInventory(id_inventory: string , updateInventroyDto: UpdateInventoryDto): Promise<InventoryEntity> {
        const inventory = await this.inventoryRepository.findOne({ where: { id_inventory }})
        if (!inventory) {
            throw new NotFoundException('Inventory Not Found!')
        }

        Object.assign(inventory, updateInventroyDto);

        return this.inventoryRepository.save(inventory);
    }

    // delete inventory
    async deleteInventory(id_inventory: string): Promise<void> {
        await this.inventoryRepository.delete({ id_inventory });
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
