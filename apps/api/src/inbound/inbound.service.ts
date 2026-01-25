import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InboundEntity } from './entities/inbound.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateInboundDto } from './dto/create-inbound.dto';
import { UpdateInboundDto } from './dto/update-inbound.dto';
import { InboundItemEntity } from './entities/inbound-item.entity';
import { IInboundResponse } from './types/inboundResponse.interface';
import { InventoryEntity } from 'src/inventory/inventory.entity';
import { PurchaseOrderItemsEntity } from 'src/orders/entities/order-items.entity';
import { OrderEntity, PurchaseOrderStatus } from 'src/orders/entities/orders.entity';

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

            // Loop Items untuk Save Detail & Update Inventory
            for (const itemDto of createInboundDto.items) {
                
                // Simpan Inbound Item (Detail)
                const inboundItem = queryRunner.manager.create(InboundItemEntity, {
                    inbound: saveInbound, 
                    id_item: itemDto.id_item,
                    id_poi: itemDto.id_poi, 
                    qty_received: Number(itemDto.qty_received),
                });
                await queryRunner.manager.save(inboundItem);

                // Ambil ID PO Item dari DTO untuk mencari ID PO Header-nya
                const poiId = itemDto.id_poi;

                // Cari data PO Item untuk mendapatkan id_po
                const samplePoItem = await queryRunner.manager.findOne(PurchaseOrderItemsEntity, {
                    where: { id_poi: poiId }
                });

                if (samplePoItem && samplePoItem.id_po) {
                    const targetPoId = samplePoItem.id_po;

                    // Ambil SEMUA detail item milik PO tersebut dari database
                    const allPoItems = await queryRunner.manager.find(PurchaseOrderItemsEntity, {
                        where: { id_po: targetPoId }
                    });

                    // Hitung apakah seluruh item sudah terpenuhi
                    const isFullyReceived = allPoItems.every(item => 
                        Number(item.qty_received) >= Number(item.qty_ordered)
                    );

                    // Update status di tabel PO Header
                    await queryRunner.manager.update(OrderEntity, 
                        { id_po: targetPoId }, 
                        { po_status: isFullyReceived ? PurchaseOrderStatus.COMPLETED : PurchaseOrderStatus.RECEIVED }
                    );
                }

                // Update Inventory berdasarkan id item
                let inventory = await queryRunner.manager.findOne(InventoryEntity, {
                    where: { 
                        id_item: itemDto.id_item, 
                    }
                });

                if (inventory) {
                    // Update stok yang ada
                    inventory.qty_available = Number(inventory.qty_available) + Number(itemDto.qty_received);
                } else {
                    // Buat baris baru jika barang belum pernah ada di lokasi tersebut
                    inventory = queryRunner.manager.create(InventoryEntity, {
                        id_item: itemDto.id_item,
                        qty_available: Number(itemDto.qty_received),
                    });
                }
                await queryRunner.manager.save(inventory);

                // update progress PO Item
                await queryRunner.manager.increment(PurchaseOrderItemsEntity, 
                    { id_poi: itemDto.id_poi }, 
                    "qty_received", 
                    itemDto.qty_received
                );
            }


            // commit
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
