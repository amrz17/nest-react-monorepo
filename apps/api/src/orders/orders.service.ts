import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './orders.entity';
import { Repository } from 'typeorm';
import { IOrdersResponse } from './types/ordersResponse.interface';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>) {}

  // Create Order
   async createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
      const newOrder = new OrderEntity();
      Object.assign(newOrder, createOrderDto);

      return this.orderRepository.save(newOrder);
   } 

   
   // Get Orders by User ID
   async getOrdersByUserId(id_user: string): Promise<OrderEntity[]> {
      return this.orderRepository.find({
          where: { id_user }
      });
   }


   // Helper method to generate order response
   generatedOrderResponse(order: OrderEntity | OrderEntity[]): IOrdersResponse {
      return {
         success: true,
         data: {
            order,
            total: Array.isArray(order) ? order.length : 1,
         },
     };
   }

}
