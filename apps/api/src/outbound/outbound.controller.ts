import { Body, Controller, Post } from '@nestjs/common';
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



}
