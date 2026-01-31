import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboundEntity } from './entities/outbound.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOutbounddDto } from './dto/create-outbound.dto';
import { OutboundItemEntity } from './entities/outbound-item.entity';
import { SaleOrderItemsEntity } from 'src/sales/entities/sale-order-items.entity';
import { SalesOrderEntity, SalesOrderStatus } from 'src/sales/entities/sales-order.entity';
import { InventoryEntity } from 'src/inventory/inventory.entity';
import { IOutboundResponse } from './types/outboundResponse.Interface';

@Injectable()
export class OutboundService {
    constructor(
        @InjectRepository(OutboundEntity)
        private readonly outboundRepo: Repository<OutboundEntity>,
        private readonly dataSource: DataSource
    ) {}

    async createOutbound(
        createOutboundDto: CreateOutbounddDto
    ): Promise<any> {
        // TODO Create Outbound Service
        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const outboundHeader = await queryRunner.manager.create(OutboundEntity, {
                outbound_number: createOutboundDto.outbound_number,
                sales_order: { id_so: createOutboundDto.id_so },
                shipped_by: { id_user: createOutboundDto.id_user },
                customer: { id_customer: createOutboundDto.id_customer },
                shipped_at: createOutboundDto.shipped_at,
                carrier_name: createOutboundDto.carrier_name,
                tracking_number: createOutboundDto.tracking_number,
                total_items: createOutboundDto.total_items,
                status_outbound: createOutboundDto.status_inbound,
                note: createOutboundDto.note
            })

            const saveOutbound = await queryRunner.manager.save(outboundHeader);

            for (const itemDto of createOutboundDto.items) {
                // 
                const outboundItem = queryRunner.manager.create(OutboundItemEntity, {
                  outbound: saveOutbound,
                  id_item: itemDto.id_item,
                  id_soi: itemDto.id_soi,
                  qty_shipped: Number(itemDto.qty_shipped),
                })
                await queryRunner.manager.save(outboundItem);

                //
                const soiId = itemDto.id_soi;

                const soItem = await queryRunner.manager.findOne(SaleOrderItemsEntity, {
                    where: { id_soi: soiId}
                });

                if (soItem && soItem.id_so) {
                    const poId = soItem.id_so;

                    //
                    const allSoItems = await queryRunner.manager.find(SaleOrderItemsEntity, {
                        where: { id_so: poId }
                    });

                    // 
                    const isFullyShipped = allSoItems.every(item => 
                        Number(item.qty_shipped) >= Number(item.qty_ordered)
                    );

                    //
                    await queryRunner.manager.update(SalesOrderEntity, 
                        { id_so: soiId },
                        { so_status: isFullyShipped ? SalesOrderStatus.COMPLETED : SalesOrderStatus.SHIPPED }

                    );
                }

                    // 
                    let inventory = await queryRunner.manager.findOne(InventoryEntity, {
                        where: {
                            id_item: itemDto.id_item
                        }
                    })

                    if (inventory) {
                        //
                        inventory.qty_reserved = Number(inventory.qty_reserved) - Number(itemDto.qty_shipped);
                    } else {
                        //
                        inventory = await queryRunner.manager.create(InventoryEntity, {
                            id_item: itemDto.id_item,
                            qty_reserved: Number(itemDto.qty_shipped)
                        })
                    }

                    await queryRunner.manager.save(inventory);

                    //
                    await queryRunner.manager.increment(SaleOrderItemsEntity, 
                        { id_soi: itemDto.id_soi },
                        "qty_reserved",
                        itemDto.qty_shipped
                    );
            }

            // 
            await queryRunner.commitTransaction();
            return saveOutbound;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException('Failed make new Outbound: ', error.message); 
        } finally {
            await queryRunner.release();
        }
    }


   // function to generate order response
   generatedResponse(outbound: OutboundEntity | OutboundEntity[]): IOutboundResponse {
      return {
         success: true,
         outbounds: outbound 
     };
   }
}
