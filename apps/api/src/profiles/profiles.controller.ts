import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, ParseUUIDPipe, UseGuards  } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { ProfilesGuard } from './profiles.guard';
import type { UUID } from 'crypto';

@Controller('profiles')
export class ProfilesController {

    constructor(private profilesService: ProfilesService) {}

    // GET /profiles
    @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    // GET /profiles/:id
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: UUID) {
        try {
            return this.profilesService.findOne(id);
        } catch(error) {
            // if (error instanceof DatabaseException) {
            //     throw new NotFoundException();
            // }
            throw new NotFoundException(error.message);
        }
    }

    // POST /profiles
    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.profilesService.createProfile(createProfileDto);
    }

    // PUT /profiles/:id
    @Put(':id')
    update(
        @Param('id', ParseUUIDPipe) id: UUID,
        @Body() updateProfileDto: UpdateProfileDto)
    {
        return this.profilesService.updateProfile(id, updateProfileDto);
    }

    // DELETE /profiles/:id
    @Delete(':id')
    @UseGuards(ProfilesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.profilesService.deleteProfile(id);
    }
}
