import { Body, Controller, Post } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDTO } from './dto/create-sale.dto';
import { ISaleResponse } from './types/salesResponse.interface';

@Controller('sale')
export class SalesController {
    constructor(private readonly saleOrderService: SalesService) {}

    // 
    @Post()
    async createSale(
        @Body() createSaleOrderDto: CreateSaleDTO 
    ): Promise<ISaleResponse> {
        const newSale = await this.saleOrderService.createSaleOrder(createSaleOrderDto);

        return await this.saleOrderService.generateSaleOrderResponse(newSale);
    }

}

