import { Body, Controller, Delete, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { IItemResponse } from './types/itemsResponse.interface';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
    //
    constructor(private readonly itemService: ItemsService) {}

    // create Item
    @Post()
    async createItem(@Body() createItemDto: CreateItemDto): Promise<IItemResponse> {
        const saveItem = await this.itemService.createItem(createItemDto);

        return this.itemService.generatedItemResponse(saveItem);
    }

    // update Item
    @Put('update/:id')
    async updateItem(
        @Param('id_item', new ParseUUIDPipe()) id_item: string,
        @Body() updateItemDto: UpdateItemDto
    ): Promise<IItemResponse> {
        const updateItem = await this.itemService.updateItem(id_item, updateItemDto);

        return this.itemService.generatedItemResponse(updateItem);
    }

    // delete Item
    @Delete('delete/:id')
    async deleteItem(
        @Param('id_item', new ParseUUIDPipe()) id_item: string
    ): Promise<void> {
        return this.itemService.deleteItem(id_item);
    }
}
