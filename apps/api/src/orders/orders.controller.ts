import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrdersResponse } from './types/ordersResponse.interface';

@Controller('order')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post('')
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<any> {
        return this.ordersService.createOrder(createOrderDto);
    }
}
