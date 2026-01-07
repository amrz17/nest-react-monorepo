import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
    private profiles = [
        {
            id: randomUUID(),
            name: 'Brian Watts',
            description: 'A IoT Developer who looking for a wife.'
        },
        {
            id: randomUUID(),
            name: 'Jasper Quinn',
            description: "A Software Engineer who looking for a partner in crime."
        },
        {
            id: randomUUID(),
            name: 'Leo Park',
            description: 'A AI Engineer who looking for a model of an AI profile.'
        }
    ];

    findAll() {
        return this.profiles;
    }

    findOne(id: string)  {
        const matchingProfile = this.profiles.find((profile) => profile.id === id);

        if (!matchingProfile) {
            throw new Error(`Profile with ID ${id} not found.`);
        }
        
        return matchingProfile;
    }

    createProfile(createProfileDto: CreateProfileDto) {
        const profile = {
            id: randomUUID(),
            ...createProfileDto
        };

        this.profiles.push(profile);
        return profile;
    }

    updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
        const mathingProfile = this.profiles.find(
            (exitingProfile) => exitingProfile.id === id
        );

        if (!mathingProfile) {
            throw new NotFoundException(`Profile with ID ${id} not found.`);
        }

        mathingProfile.name = updateProfileDto.name;
        mathingProfile.description = updateProfileDto.description;

        return mathingProfile;
    }

    deleteProfile(id: string): void {
        const mathingProfileIndex = this.profiles.findIndex(
            (exitingProfile) => exitingProfile.id === id
        );

        if (mathingProfileIndex > -1) {
            this.profiles.splice(mathingProfileIndex, 1);
        } else {
            throw new NotFoundException(`Profile with ID ${id} not found.`);
        }
    }
}
