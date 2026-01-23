import { Body, Controller, Post } from '@nestjs/common';
import { InboundService } from './inbound.service';
import { CreateInboundDto } from './dto/create-inbound.dto';
import { IInboundResponse } from './types/inboundResponse.interface';

@Controller('inbound')
export class InboundController {
    constructor(
        private readonly inboundService: InboundService
    ) {}

    @Post()
    async createInbound(
        @Body() createInboundDto: CreateInboundDto
    ): Promise<IInboundResponse> {
        const newInbound = await this.inboundService.createInbound(createInboundDto);

        return await this.inboundService.generatedOrderResponse(newInbound);
    }
}
