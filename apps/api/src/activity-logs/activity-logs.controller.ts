import { Controller, Get } from '@nestjs/common';
import { ActivityLogsService } from './activity-logs.service';
import { IActivityLogsResponse } from './types/activity-logsResponse.interface';

@Controller('activity-logs')
export class ActivityLogsController {
    constructor(
        private readonly activityLogsService: ActivityLogsService
    ) {}

    // TODO : Add endpoints to handle activity logs here
    @Get()
    async getActivityLogs (): Promise<IActivityLogsResponse> {
        const logs = await this.activityLogsService.getActivityLogs();

        return this.activityLogsService.generateActivityLogsResponse(logs);
    }
}

