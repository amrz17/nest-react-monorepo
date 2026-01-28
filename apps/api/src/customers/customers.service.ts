import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ICustomerResponse } from './types/customerResponse.interface';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepo: Repository<CustomerEntity>
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
        const newCustomer = new CustomerEntity();
        Object.assign(newCustomer, createCustomerDto);

        return await this.customerRepo.save(newCustomer)
    }

    async updateCustomer(
        id_customer: string,
        updateCustomerDto: UpdateCustomerDto
    ): Promise<CustomerEntity> {
        const cust = await this.customerRepo.findOne({ where: { id_customer }})

        if (!cust) {
            throw new NotFoundException('Customer Not Found')
        }

        Object.assign(cust, updateCustomerDto);

        return await this.customerRepo.save(cust);
    }

    async deleteCustomer(
        id_customer: string
    ): Promise<void> {
        await this.customerRepo.delete({ id_customer })
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