import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesOrderEntity } from './entities/sales-order.entity';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(SalesOrderEntity)
        private readonly saleRepo: Repository<SalesOrderEntity>
    ) {}

    async createSaleOrder() {

    }
    // TODO make logic for automatic add qty_ordered on inventory
}
