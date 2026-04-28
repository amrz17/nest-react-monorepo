import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { IItemResponse } from './types/itemsResponse.interface';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from '../user/guards/auth.guard';
import { Roles } from '../user/decorators/roles.decorator';
import { UserRole } from '../user/user.entity';
import { type AuthRequest } from '../user/types/expressRequest.interface';
import { use } from 'passport';

@Controller('items')
export class ItemsController {
    //
    constructor(private readonly itemService: ItemsService) {}

    // get All Items
    @Get('')
    async getAllItems(): Promise<IItemResponse> {
        const items = await this.itemService.getAllItems();

        return this.itemService.generatedItemResponse(items);
    }

    // create Item
    @Post('')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async createItem(
        @Body() createItemDto: CreateItemDto,
        @Req() req: AuthRequest
    ): Promise<IItemResponse> {
        const userId = req.user.id_user;
        const saveItem = await this.itemService.createItem(createItemDto, userId);

        return this.itemService.generatedItemResponse(saveItem);
    }

    // update Item
    @Put('update/:id_item')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async updateItem(
        @Param('id_item', new ParseUUIDPipe()) id_item: string,
        @Body() updateItemDto: UpdateItemDto,
        @Req() req: AuthRequest
    ): Promise<IItemResponse> {
        const userId = req.user.id_user;
        const updateItem = await this.itemService.updateItem(id_item, updateItemDto, userId);

        return this.itemService.generatedItemResponse(updateItem);
    }

    // delete Item
    @Delete('delete/:id_item')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async deleteItem(
        @Param('id_item', new ParseUUIDPipe()) id_item: string,
        @Req() req: AuthRequest
    ): Promise<void> {
        const userId = req.user.id_user;
        return this.itemService.deleteItem(id_item, userId);
    }
}
