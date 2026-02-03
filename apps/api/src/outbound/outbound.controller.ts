import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OutboundService } from './outbound.service';
import { CreateOutbounddDto } from './dto/create-outbound.dto';

@Controller('outbound')
export class OutboundController {
    constructor(
        private readonly outboundService: OutboundService
    ) {}

    // 
    @Post()
    async createOutbound(
        @Body() createOuboundDto: CreateOutbounddDto
    ): Promise<any> {
        const newOutbound = await this.outboundService.createOutbound(createOuboundDto);

        return await this.outboundService.generatedResponse(newOutbound);
    }

    //
    @Post('cancel/:id_outbound')
    async cancelOutbound(
        @Param('id_outbound', new ParseUUIDPipe()) id_outbound: string
    ): Promise<any> {
        const cancel = await this.outboundService.cancelOutbound(id_outbound);

        return await this.outboundService.generatedResponse(cancel);
    }

    //
    @Get()
    async getAllOutbound(): Promise<any> {
        const outbounds = await this.outboundService.getAllOutbound();

        return await this.outboundService.generatedResponse(outbounds);
    }



}
