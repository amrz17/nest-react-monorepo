import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ILocationResponse } from './types/locationResponse.interface';
import { AuthGuard } from '../user/guards/auth.guard';
import { UserRole } from '../user/user.entity';
import { Roles } from '../user/decorators/roles.decorator';
import { type AuthRequest } from '../user/types/expressRequest.interface';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationService: LocationsService) {}

    // Get All 
    @Get()
    async getAllLocation(): Promise<any> {
        const locations = await this.locationService.getAllLocations();

        return this.locationService.generateLocationResponse(locations);
    }

    // Create Location
    @Post()
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async createLocation(
        @Body() createLocationDto: CreateLocationDto,
        @Req() req: AuthRequest

    ): Promise<ILocationResponse> {
        const userId = req.user.id_user;
        const newLocation = await this.locationService.createLocation(createLocationDto, userId);

        return this.locationService.generateLocationResponse(newLocation);
    }

    // Update Location
    @Put('update/:id_location')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async updateLocation(
        @Param('id_location', new ParseUUIDPipe()) id_location: string,
        @Body() updateLocationDto: UpdateLocationDto,
        @Req() req: AuthRequest
    ): Promise<ILocationResponse> {
        const userId = req.user.id_user;
        const updateLocation = await this.locationService.updateLocation(id_location, updateLocationDto, userId);

        return this.locationService.generateLocationResponse(updateLocation);
    }

    // Delete
    @Delete('delete/:id_location')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF_GUDANG)
    async deleteLocation(
        @Param('id_location', new ParseUUIDPipe()) id_loction: string,
        @Req() req: AuthRequest
    ): Promise<void> {
        const userId = req.user.id_user;
        return this.locationService.deleteLocation(id_loction, userId);
    }

}
