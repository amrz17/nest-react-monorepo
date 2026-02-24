import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ICustomerResponse } from './types/customerResponse.interface';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepo: Repository<CustomerEntity>,
        private readonly activityLogsService: ActivityLogsService,
        private readonly dataSource: DataSource
    ) {}

    // 
    async getAllCustomer(): Promise<CustomerEntity[]> {
        return this.customerRepo.find({
            order: {
                created_at: 'DESC'
            }
        })
    }

    // 
    async createCustomer(
        createCustomerDto: CreateCustomerDto
    ): Promise<CustomerEntity> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const newCustomer = queryRunner.manager.create(CustomerEntity, {
                ...createCustomerDto,
            });

            const savedCustomer = queryRunner.manager.save(newCustomer);

            // simpan logs
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: 'ADMIN',
                action: 'CREATE',
                module: 'CUSTOMER',
                resource_id: (await savedCustomer).id_customer,
                description: `${(await savedCustomer).customer_name}`,
                metadata: {
                    ...savedCustomer
                }
            });

            await queryRunner.commitTransaction();
            return savedCustomer;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error; 
        } finally {
            await queryRunner.release();
        }
    }

    async updateCustomer(
        id_customer: string,
        updateCustomerDto: UpdateCustomerDto
    ): Promise<CustomerEntity> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            
            const oldCustomer = await queryRunner.manager.findOne(CustomerEntity, {
                where: { id_customer },
                relations: ['sales_order']
            });

            if (!oldCustomer) {
                throw new NotFoundException('Customer Not Found!')
            }

            // Snapshot data lama secara eksplisit
            const before = {
                ...oldCustomer
            };

            // update data
            Object.assign(oldCustomer, updateCustomerDto);

            const updateInventory = await queryRunner.manager.save(oldCustomer);

            // save log
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: 'ADMIN',
                action: 'UPDATE',
                module: 'CUSTOMER',
                resource_id: id_customer,
                description: `Update: ${oldCustomer.customer_name}`,
                metadata: {
                    before: before,
                    after: {
                        customer_name: updateCustomerDto.customer_name,
                        customer_address: updateCustomerDto.customer_address,
                        customer_phone: updateCustomerDto.customer_phone,
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

    async deleteCustomer(
        id_customer: string
    ): Promise<void> {
        // await this.customerRepo.delete({ id_customer })

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // find data
            const customer = await queryRunner.manager.findOne(CustomerEntity, { 
                where: { id_customer } 
            });

            if (!customer) {
                throw new NotFoundException('Customer Not Found!');
            }

            // delete data
            await queryRunner.manager.delete(CustomerEntity, { id_customer });

            // save log
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: "ADMIN",
                action: 'DELETE',
                module: 'CUSTOMER',
                resource_id: id_customer,
                description: `${customer.customer_name}`,
                metadata: { 
                    deleted_data: customer, // Menyimpan seluruh object yang dihapus
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

    generateCustomerResponse(
        cust: CustomerEntity | CustomerEntity[]
    ): ICustomerResponse {
        return {
            success: true,
            customers: cust
        }
    }
}