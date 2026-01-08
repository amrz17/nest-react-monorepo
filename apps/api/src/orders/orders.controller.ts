import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrdersResponse } from './types/ordersResponse.interface';

@Controller('order')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // Create Order
    @Post('')
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<IOrdersResponse> {
        const saveOrder = await this.ordersService.createOrder(createOrderDto);

        return this.ordersService.generatedOrderResponse(saveOrder);
    }

    // Get Orders by User ID
    @Get(':id_user')
    async getOrdersByUserId(@Param('id_user', new ParseUUIDPipe()) id_user: string): Promise<IOrdersResponse> {
        const order = await this.ordersService.getOrdersByUserId(id_user);

        return this.ordersService.generatedOrderResponse(order);
    }
}
