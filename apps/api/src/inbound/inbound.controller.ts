import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { InboundService } from './inbound.service';
import { CreateInboundDto } from './dto/create-inbound.dto';
import { IInboundResponse } from './types/inboundResponse.interface';

@Controller('inbound')
export class InboundController {
    constructor(
        private readonly inboundService: InboundService
    ) {}

    //
    @Get()
    async getAllInbound(): Promise<IInboundResponse> {
        const inbounds = await this.inboundService.getAllInbound();

        return await this.inboundService.generatedOrderResponse(inbounds);
    }

    //
    @Post()
    async createInbound(
        @Body() createInboundDto: CreateInboundDto
    ): Promise<IInboundResponse> {
        const newInbound = await this.inboundService.createInbound(createInboundDto);

        return await this.inboundService.generatedOrderResponse(newInbound);
    }

    //
    @Post('cancel/:id_inbound')
    async cancelInbound(
        @Param('id_inbound', new ParseUUIDPipe()) id_inbound: string,
    ): Promise<IInboundResponse> {
        const cancel = await this.inboundService.cancelInbound(id_inbound);

        return await this.inboundService.generatedOrderResponse(cancel);
    }
}
