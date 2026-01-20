import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderItemsEntity } from './order-items.entity';
import { Repository } from 'typeorm';
import { CreatePOIDto } from './dto/create-poitem.dto';
import { IPOItemResponse } from './types/poiRespose.interface';
import { UpdatePOIDto } from './dto/update-poitem.dto';

@Injectable()
export class PurchaseOrderItemsService {
    constructor(@InjectRepository(PurchaseOrderItemsEntity) private readonly poiRepository: Repository<PurchaseOrderItemsEntity>) {}

    // 
    async getAllPOI(): Promise<PurchaseOrderItemsEntity[]> {
        return await this.poiRepository.find()
    }

    // create 
    async createPOItem(createPOIDto: CreatePOIDto): Promise<PurchaseOrderItemsEntity> {
        const newPOI = new PurchaseOrderItemsEntity();

        Object.assign(newPOI, createPOIDto);

        return await this.poiRepository.save(newPOI);
    }

    // 
    async updatePOItem(
        id_poi: string,
        updatePOIDto: UpdatePOIDto
    ): Promise<PurchaseOrderItemsEntity> {
        const POI = await this.poiRepository.findOne({ where: {id_poi } });

        if (!POI) {
            throw new NotFoundException("Purchase Order Item Not Found!")
        }

        Object.assign(POI, updatePOIDto);

        return this.poiRepository.save(POI);
    }

    // 
    async deletePOI(
        id_poi: string
    ): Promise<void> {
        await this.poiRepository.delete(id_poi)
    }

    // 
    generateResponse(
        poi: PurchaseOrderItemsEntity | PurchaseOrderItemsEntity[]
    ): IPOItemResponse {
        return {
            success: true,
            po_items: poi
        }
    }
}
