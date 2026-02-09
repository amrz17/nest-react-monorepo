import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InboundEntity, StatusInbound } from './entities/inbound.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateInboundDto } from './dto/create-inbound.dto';
import { UpdateInboundDto } from './dto/update-inbound.dto';
import { InboundItemEntity } from './entities/inbound-item.entity';
import { IInboundResponse } from './types/inboundResponse.interface';
import { InventoryEntity } from '../inventory/inventory.entity';
import { PurchaseOrderItemsEntity } from '../orders/entities/order-items.entity';
import { OrderEntity, PurchaseOrderStatus } from '../orders/entities/orders.entity';
import { QueryRunner } from 'typeorm/browser';

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
    ): Promise<InboundEntity> {
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

    async getAllInbound(): Promise<InboundEntity[]> {
        return await this.inboundRepo.find({
            relations: ['receivedBy', 'supplierName', 'items'],
            order: {
                created_at: 'DESC'
            }
        });
    }

    // 
    async cancelInbound(
        id_inbound: string
    ): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Ambil data Inbound beserta detailnya
            const inbound = await queryRunner.manager.findOne(InboundEntity, {
                where: { id_inbound },
                relations: ['items'] 
            });

            if (!inbound) throw new NotFoundException('Inbound not found');
            if (inbound.status_inbound === StatusInbound.CANCELED) throw new BadRequestException('Already cancelled');

            // Loop Items untuk Mengembalikan Stok
            for (const item of inbound.items) {
                
                // Kurangi stok di Inventory
                await queryRunner.manager.decrement(InventoryEntity,
                    { id_item: item.id_item },
                    "qty_available",
                    item.qty_received
                );

                // Kurangi qty_received di Purchase Order Item
                await queryRunner.manager.decrement(PurchaseOrderItemsEntity,
                    { id_poi: item.id_poi },
                    "qty_received",
                    item.qty_received
                );
            }

            // Ubah status Inbound Header
            inbound.status_inbound = StatusInbound.CANCELED;
            await queryRunner.manager.save(inbound);

            // Update kembali status PO Header ke 'PARTIAL' atau 'OPEN'
            await this.updatePOStatus(inbound.id_po, queryRunner);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    // 
    private async updatePOStatus(id_po: string, queryRunner: QueryRunner): Promise<void> {
        // Ambil semua item dari PO tersebut
        const allPoItems = await queryRunner.manager.find(PurchaseOrderItemsEntity, {
            where: { id_po: id_po }
        });

        // Hitung status berdasarkan qty
        let totalOrdered = 0;
        let totalReceived = 0;

        allPoItems.forEach(item => {
            totalOrdered += Number(item.qty_ordered);
            totalReceived += Number(item.qty_received);
        });

        let newStatus = 'PENDING';
        if (totalReceived >= totalOrdered) {
            newStatus = 'COMPLETED';
        } else if (totalReceived > 0) {
            newStatus = 'RECEIVED';
        }

        // Update status ke tabel PO Header
        await queryRunner.manager.update(OrderEntity, 
            { id_po: id_po }, 
            { po_status: newStatus as any }
        );
    }


   // Helper method to generate order response
   generatedOrderResponse(inbound: InboundEntity | InboundEntity[]): IInboundResponse {
      return {
         success: true,
         inbounds: inbound 
     };
   }

}
