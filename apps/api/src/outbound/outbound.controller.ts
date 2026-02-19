import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { OutboundService } from './outbound.service';
import { CreateOutbounddDto } from './dto/create-outbound.dto';
import { AuthGuard } from '../user/guards/auth.guard';
import { type AuthRequest } from '../user/types/expressRequest.interface';

@Controller('outbound')
export class OutboundController {
    constructor(
        private readonly outboundService: OutboundService
    ) {}

    // 
    @Post()
    @UseGuards(AuthGuard)
    async createOutbound(
        @Body() createOuboundDto: CreateOutbounddDto,
        @Req() req: AuthRequest
    ): Promise<any> {
        const userId = req.user.id_user;
        const newOutbound = await this.outboundService.createOutbound(createOuboundDto, userId);

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
