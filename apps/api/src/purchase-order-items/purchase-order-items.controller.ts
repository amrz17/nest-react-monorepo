import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { PurchaseOrderItemsService } from './purchase-order-items.service';
import { CreatePOIDto } from './dto/create-poitem.dto';
import { IPOItemResponse } from './types/poiRespose.interface';
import { UpdatePOIDto } from './dto/update-poitem.dto';

@Controller('purchase-order-item')
export class PurchaseOrderItemsController {
    constructor(private readonly poiService: PurchaseOrderItemsService) {}

    // 
    @Get()
    async getAllPOI(): Promise<IPOItemResponse> {
        const POIs = await this.poiService.getAllPOI()

        return this.poiService.generateResponse(POIs);
    }

    // 
    @Post()
    async createPOI(
        @Body() createPOIDto :CreatePOIDto
    ): Promise<IPOItemResponse> {
        const newPoi = await this.poiService.createPOItem(createPOIDto)

        return this.poiService.generateResponse(newPoi);
    }

    // 
    @Put('/update/:id_poi')
    async updatePOI(
        @Param('id_poi', new ParseUUIDPipe()) id_poi: string,
        @Body() updatePOIDto :UpdatePOIDto 
    ): Promise<IPOItemResponse> {
        const newPOI = await this.poiService.updatePOItem(id_poi, updatePOIDto);

        return this.poiService.generateResponse(newPOI);
    }

    // 
    @Delete('/delete/:id_poi')
    async deletePOI(
        @Param('id_poi', new ParseUUIDPipe()) id_poi: string
    ): Promise<IPOItemResponse> {
        await this.poiService.deletePOI(id_poi)
        return {
            success: true,
            message: "Delete Purchase Order Item success!"
        }
    }

}
