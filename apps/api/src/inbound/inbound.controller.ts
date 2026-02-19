import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { InboundService } from './inbound.service';
import { CreateInboundDto } from './dto/create-inbound.dto';
import { IInboundResponse } from './types/inboundResponse.interface';
import { AuthGuard } from '../user/guards/auth.guard';
import { type AuthRequest } from '../user/types/expressRequest.interface';

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
    @UseGuards(AuthGuard)
    async createInbound(
        @Body() createInboundDto: CreateInboundDto,
        @Req() req: AuthRequest
    ): Promise<IInboundResponse> {
        const userId = req.user.id_user;
        const newInbound = await this.inboundService.createInbound(createInboundDto, userId);

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
