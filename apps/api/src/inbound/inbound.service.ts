import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InboundEntity } from './entities/inbound.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateInboundDto } from './dto/create-inbound.dto';
import { UpdateInboundDto } from './dto/update-inbound.dto';
import { InboundItemEntity } from './entities/inbound-item.entity';
import { IInboundResponse } from './types/inboundResponse.interface';

@Injectable()
export class InboundService {

    constructor(
        @InjectRepository(InboundEntity)
        private readonly inboundRepo: Repository<InboundEntity>,
        private readonly dataSource: DataSource
    ) {}

    // create 
    async createInbound(
        createInboundDto: CreateInboundDto
    ): Promise<any> {
        // TODO Make Logic business
        const queryRunner = this.dataSource.createQueryRunner();
        // Connect TO DB
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Save Header 
            const inboundHeader = queryRunner.manager.create(InboundEntity, {
                inbound_number: createInboundDto.inbound_number,
                purchaseOrder: { id_po: createInboundDto.id_po },
                receivedBy: { id_user: createInboundDto.id_user },
                supplierName: { id_supplier: createInboundDto.id_supplier },
                received_at: createInboundDto.received_at,
                note: createInboundDto.note,

            })
            const saveInbound = await queryRunner.manager.save(inboundHeader);

            const inboundItem = createInboundDto.items.map((itemDto) => {
                const item = new InboundItemEntity();
                item.inbound = inboundHeader;
                item.id_item = itemDto.id_item;
                item.id_poi = itemDto.id_poi;
                item.qty_received = itemDto.qty_received;

                return item;
            })

            await queryRunner.manager.save(inboundItem);

            // TODO Make logic automated update qty_reserved, qty_ordered, qty_avalible

            // comit
            await queryRunner.commitTransaction();
            return saveInbound;

        } catch (err) {
            // 
            await queryRunner.rollbackTransaction();
            throw new BadRequestException('Failed make new inbound: ' + err.message);
        } finally {
            // Disconnect DB
            await queryRunner.release();
        }
        
        
    }

    async updateInbound(
        updateInboundDto: UpdateInboundDto
    ): Promise<any> {
        // TODO Make Logic update
    }


   // Helper method to generate order response
   generatedOrderResponse(inbound: InboundEntity | InboundEntity[]): IInboundResponse {
      // Return the order(s) wrapped in a response object
      return {
         success: true,
         inbounds: inbound 
     };
   }

}
