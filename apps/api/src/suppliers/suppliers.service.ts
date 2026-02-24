import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierEntity } from './suppliers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { ISupplierResponse } from './types/supplierResponse.interface';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';
import { DataSource } from 'typeorm';

@Injectable()
export class SuppliersService {
    constructor(
        @InjectRepository(SupplierEntity) 
        private readonly supplierRepository: Repository<SupplierEntity>,
        private readonly activityLogsService: ActivityLogsService,
        private readonly dataSource: DataSource
    ) {}

    // 
    async getAllSuppliers(): Promise<SupplierEntity[]> {
        return await this.supplierRepository.find({})
    }

    // create Supplier
    async createSupplier(createSupplierDto: CreateSupplierDto): Promise<SupplierEntity> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // inisialisasi dan simpan inventory
            const newSupplier = queryRunner.manager.create(SupplierEntity, {
                ...createSupplierDto,
            });

            const savedSupplier = queryRunner.manager.save(newSupplier);            

            // simpan logs
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: '',
                action: 'CREATE',
                module: "SUPPLIER",
                resource_id: (await savedSupplier).id_supplier,
                description: `${(await savedSupplier).name}`,
                metadata: {
                    supplier_address: (await savedSupplier).suppliers_address,
                    pic_name: (await savedSupplier).pic_name,
                }
            })

            await queryRunner.commitTransaction();
            return savedSupplier;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release()
        }

    }

    // update Supplier
    async updateSupplier(
        id_supplier: string,
        updateSupplierDto: UpdateSupplierDto
    ): Promise<SupplierEntity> {
        // const supplier = await this.supplierRepository.findOne({ where: { id_supplier }})

        // if (!supplier) {
        //     throw new NotFoundException("Supplier not found!")
        // }

        // Object.assign(supplier, updateSupplierDto);

        // return await this.supplierRepository.save(supplier)

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // data lama
            const oldSupplier = await queryRunner.manager.findOne(SupplierEntity, {
                where: { id_supplier },
            });

            if (!oldSupplier) {
                throw new NotFoundException('Supplier Not Found!')
            }

            // Snapshot data lama secara eksplisit
            const before = {
                ...oldSupplier
            };

            // update data
            Object.assign(oldSupplier, updateSupplierDto);

            const updateInventory = await queryRunner.manager.save(oldSupplier);

            // save log
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: '',
                action: 'UPDATE',
                module: 'SUPPLIER',
                resource_id: id_supplier,
                description: `${oldSupplier.name}`,
                metadata: {
                    before: before,
                    after: {
                        qty_available: updateSupplierDto.name,
                        supplier_address: updateSupplierDto.suppliers_address,
                        pic_name: updateSupplierDto.pic_name,
                    }
                }
            });

            await queryRunner.commitTransaction();
            return updateInventory;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error; 
        } finally {
            await queryRunner.release();
        }

    }

    // 
    async deleteSupplier(
        id_supplier: string
    ): Promise<void> {
        // await this.supplierRepository.delete({ id_supplier})

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // find data
            const supplier = await queryRunner.manager.findOne(SupplierEntity, { 
                where: { id_supplier } 
            });

            if (!supplier) {
                throw new NotFoundException('Supplier Not Found!');
            }

            // delete data
            await queryRunner.manager.delete(SupplierEntity, { id_supplier });

            // save log
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: '',
                action: 'DELETE',
                module: 'SUPPLIER',
                resource_id: id_supplier,
                description: `${supplier.name}`,
                metadata: { 
                    deleted_data: supplier, // Menyimpan seluruh object yang dihapus
                    deleted_at: new Date()
                }
            });

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    // response 
    generateResponseSupplier(
       supplier: SupplierEntity | SupplierEntity[]
    ): ISupplierResponse {
        return {
            success: true,
            supplier: supplier
        }
    }
}
