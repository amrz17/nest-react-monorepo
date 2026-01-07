import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>) {}

   createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
      const newOrder = new OrderEntity();
      Object.assign(newOrder, createOrderDto);
      return this.orderRepository.save(newOrder);
   } 
}
