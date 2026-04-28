import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrdersResponse } from './types/ordersResponse.interface';
import { AuthGuard } from '../user/guards/auth.guard';
import { type AuthRequest } from '../user/types/expressRequest.interface';
import { Roles } from '../user/decorators/roles.decorator';
import { UserRole } from '../user/user.entity';

@Controller('purchase-order')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // Create Order
    @Post('')
    // @UseGuards(AuthGuard)
    // @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @Req() req: AuthRequest
    ): Promise<IOrdersResponse> {
        const userId = req.user.id_user;
        const saveOrder = await this.ordersService.createOrder(createOrderDto, userId);

        return this.ordersService.generatedOrderResponse(saveOrder);
    }

    // Get All Orders
    @Get('')
    async getAllOrders(): Promise<IOrdersResponse> {
        const orders = await this.ordersService.getAllOrders();

        return this.ordersService.generatedOrderResponse(orders);
    }

    // Cancel Purchase Order
    @Post('/cancel/:id_po')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async cancelPurchaseOrder(
        @Param('id_po', new ParseUUIDPipe()) id_po: string,
        @Req() req: AuthRequest
    ): Promise<any> {
        const userId = req.user.id_user;
        const po = await this.ordersService.cancelPurchaseOrder(id_po, userId);

        return await this.ordersService.generatedOrderResponse(po);
    }
    @Get(':id/items')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async getPOItems(@Param('id') id: string) {
        return this.ordersService.getPOItems(id);
    }

    // // Get Orders by User ID
    // @Get(':id_user')
    // async getOrdersByUserId(@Param('id_user', new ParseUUIDPipe()) id_user: string): Promise<IOrdersResponse> {
    //     const order = await this.ordersService.getOrdersByUserId(id_user);

    //     return this.ordersService.generatedOrderResponse(order);
    // }

}
