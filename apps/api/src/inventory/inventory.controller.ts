import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { IInventoryResponse } from './types/inventoryResponse.interface';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    // Get All
    @Get()
    async getAllInventory(): Promise<IInventoryResponse> {
        const inventorys = await this.inventoryService.getAllInventory();
        return this.inventoryService.generateResponseInventory(inventorys);
    }

    // create Inventory
    @Post()
    async createInventory(
        @Body() createInventoryDto: CreateInventoryDto
    ): Promise<IInventoryResponse> {
        const newInventory = await this.inventoryService.createInventory(createInventoryDto);

        return this.inventoryService.generateResponseInventory(newInventory);
    }

    // update Inventory
    @Put('update/:id_inventory')
    async updateInventory(
        @Param('id_inventory', new ParseUUIDPipe()) id_inventory: string,
        @Body() updateInventoryDto: UpdateInventoryDto
    ): Promise<IInventoryResponse> {
        const updateInventory = await this.inventoryService.updateInventory(id_inventory, updateInventoryDto)

        return this.inventoryService.generateResponseInventory(updateInventory);
    }

    // delete inventory
    @Delete('delete/:id_inventory')
    async deleteInventory(
        @Param('id_inventory', new ParseUUIDPipe()) id_inventory: string
    ): Promise<void> {
        return this.inventoryService.deleteInventory(id_inventory)
    }
}

