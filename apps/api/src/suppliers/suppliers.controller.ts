import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { ISupplierResponse } from './types/supplierResponse.interface';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { AuthGuard } from '../user/guards/auth.guard';
import { UserRole } from '../user/user.entity';
import { Roles } from '../user/decorators/roles.decorator';
import { type AuthRequest } from '../user/types/expressRequest.interface';

@Controller('suppliers')
export class SuppliersController {
    constructor(private readonly  supplierService: SuppliersService) {}

    //
    @Get()
    async getAllSuppliers(): Promise<ISupplierResponse> {
        const suppliers = await this.supplierService.getAllSuppliers();

        return this.supplierService.generateResponseSupplier(suppliers);
    }

    // 
    @Post('')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async createSupplier(
        @Body() createSupplierDto: CreateSupplierDto,
        @Req() req: AuthRequest
    ): Promise<ISupplierResponse> {
        const userId = req.user.id_user;
        const newSupplier = await this.supplierService.createSupplier(createSupplierDto, userId);

        return this.supplierService.generateResponseSupplier(newSupplier);
    }

    // 
    @Put('/update/:id_supplier')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async updateSupplier(
        @Param('id_supplier', new ParseUUIDPipe()) id_supplier: string,
        @Body() updateSupplierDto: UpdateSupplierDto,
        @Req() req: AuthRequest
    ): Promise<ISupplierResponse> {
        const userId = req.user.id_user;
        const supplier = await this.supplierService.updateSupplier(id_supplier, updateSupplierDto, userId);

        return this.supplierService.generateResponseSupplier(supplier);
    }

    // 
    @Delete('/delete/:id_supplier')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async deleteSupplier(
        @Param('id_supplier', new ParseUUIDPipe()) id_supplier: string,
        @Req() req: AuthRequest
    ): Promise<any> {
        const userId = req.user.id_user;
        await this.supplierService.deleteSupplier(id_supplier, userId);
        return {
            sucess: true,
            message: "Delete Supplier Data Success!"
        }
    }

}
