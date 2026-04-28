import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from './locations.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ILocationResponse } from './types/locationResponse.interface';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';
import { DataSource } from 'typeorm';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(LocationEntity)
        private readonly locationRepository: Repository<LocationEntity>,
        private readonly activityLogsService: ActivityLogsService,
        private readonly dataSource: DataSource
    ) {}

    // Get All
    async getAllLocations(): Promise<LocationEntity | LocationEntity[]> {
        return this.locationRepository.find({
            order: {
                created_at: 'DESC'
            }
        })
    }

    // Create  Location
    async createLocation(
        createLocationDto: CreateLocationDto,
        userId: string
    ): Promise<LocationEntity> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // inisialisasi dan simpan location
            const newLocation = queryRunner.manager.create(LocationEntity, {
                ...createLocationDto,
            });

            const savedLocation = queryRunner.manager.save(newLocation);            

            // simpan logs
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: userId,
                action: 'CREATE',
                module: "LOCATION",
                resource_id: (await savedLocation).id_location,
                description: `${(await savedLocation).bin_code}`,
                metadata: {
                    bin_code: (await savedLocation).bin_code,
                    description: (await savedLocation).description,
                }
            })

            await queryRunner.commitTransaction();
            return savedLocation;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release()
        }

    }

    // Update 
    async updateLocation(
        id_location: string,
        updateLocationDto: UpdateLocationDto,
        userId: string
    ): Promise<LocationEntity> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // data lama
            const oldLocation = await queryRunner.manager.findOne(LocationEntity, {
                where: { id_location },
            });

            if (!oldLocation) {
                throw new NotFoundException('Location Not Found!')
            }

            // Snapshot data lama secara eksplisit
            const before = {
                ...oldLocation
            };

            // update data
            Object.assign(oldLocation, updateLocationDto);

            const updateInventory = await queryRunner.manager.save(oldLocation);

            // save log
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: userId,
                action: 'UPDATE',
                module: 'LOCATION',
                resource_id: id_location,
                description: `${oldLocation.bin_code}`,
                metadata: {
                    before: before,
                    after: {
                        bin_code: updateInventory.bin_code,
                        description: updateInventory.description,
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
    
    // Delete
    async deleteLocation(
        id_location: string,
        userId: string
    ): Promise<void> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // find data
            const location = await queryRunner.manager.findOne(LocationEntity, { 
                where: { id_location } 
            });

            if (!location) {
                throw new NotFoundException('Location Not Found!');
            }

            // delete data
            await queryRunner.manager.delete(LocationEntity, { id_location });

            // save log
            await this.activityLogsService.createLogs(queryRunner.manager, {
                id_user: userId,
                action: 'DELETE',
                module: 'LOCATION',
                resource_id: id_location,
                description: `${location.bin_code}`,
                metadata: { 
                    deleted_data: location, // Menyimpan seluruh object yang dihapus
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

    // 
    async generateLocationResponse(
        location: LocationEntity | LocationEntity[]
    ): Promise<ILocationResponse> {
        return {
            success: true,
            location: location
        }
    }


}
