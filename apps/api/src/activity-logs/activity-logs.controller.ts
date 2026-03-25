import { Controller, Get, UseGuards } from '@nestjs/common';
import { ActivityLogsService } from './activity-logs.service';
import { IActivityLogsResponse } from './types/activity-logsResponse.interface';
import { RolesGuard } from '../user/guards/roles.guard';
import { Roles } from '../user/decorators/roles.decorator';
import { UserRole } from '../user/user.entity';

@Controller('activity-logs')
@UseGuards(RolesGuard)
export class ActivityLogsController {
    constructor(
        private readonly activityLogsService: ActivityLogsService
    ) {}

    // TODO : Add endpoints to handle activity logs here
    @Get()
    @Roles(UserRole.ADMIN, UserRole.MANAGER) 
    async getActivityLogs (): Promise<IActivityLogsResponse> {
        const logs = await this.activityLogsService.getActivityLogs();

        return this.activityLogsService.generateActivityLogsResponse(logs);
    }
}

