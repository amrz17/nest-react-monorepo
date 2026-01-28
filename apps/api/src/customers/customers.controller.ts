import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ICustomerResponse } from './types/customerResponse.interface';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomersController {
    constructor(
        private readonly customerService: CustomersService
    ) {}

    //
    @Get()
    async getAllCustomer(): Promise<ICustomerResponse> {
        const custs = await this.customerService.getAllCustomer();

        return await this.customerService.generateCustomerResponse(custs);
    }

    //
    @Post()
    async addCustomer(
        @Body() createCustomerDto: CreateCustomerDto
    ): Promise<ICustomerResponse> {
        const newCustomer = await this.customerService.createCustomer(createCustomerDto);

        return await this.customerService.generateCustomerResponse(newCustomer);
    }

    @Put('/update/:id_customer')
    async updateCustomer(
        @Param('id_customer', new ParseUUIDPipe()) id_customer: string,
        @Body() updateCustomerDto: UpdateCustomerDto
    ): Promise<ICustomerResponse> {
        const cust = await this.customerService.updateCustomer(id_customer, updateCustomerDto);

        return await this.customerService.generateCustomerResponse(cust);
    }

    //
    @Delete('/delete/:id_customer')
    async deleteCustomer(
        @Param('id_customer', new ParseUUIDPipe()) id_customer: string
    ): Promise<void> {
        return await this.customerService.deleteCustomer(id_customer)
    }

}
