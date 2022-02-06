import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../../../auth/auth-user.guard';
import { Roles } from '../../../auth/roles.decorator';
import { RolesGuard } from '../../../auth/roles.guard';
import { UserRole } from '../../../entities/user.entity';
import {
    AddWeekRequest,
    GetSeasonsSummaryResponse,
    StartNewSeasonRequest,
    UpdateLeagueNotesRequest
} from './manager-dashboard.dtos';
import { ManagerDashboardService } from './manager-dashboard.service';

@Controller('manager/dashboard')
@UseGuards(AuthGuard('jwt'), AuthUserGuard, RolesGuard)
export class ManagerDashboardController {
    constructor(private _managerDashboardService: ManagerDashboardService) {}

    @Post('getSeasonsSummary')
    @Roles(UserRole.Manager)
    async getSeasonSummary(@Req() request): Promise<GetSeasonsSummaryResponse> {
        const seasonSummaries =
            await this._managerDashboardService.getSeasonsSummary(
                request.currentLeague.leagueId
            );

        return {
            seasons: seasonSummaries
        };
    }

    @Post('updateLeagueNotes')
    @Roles(UserRole.Manager)
    async updateLeagueNotes(
        @Req() request,
        @Body() updateLeagueNotesRequest: UpdateLeagueNotesRequest
    ): Promise<EmptyResponse> {
        await this._managerDashboardService.updateLeagueNotes(
            request.currentLeague.leagueId,
            updateLeagueNotesRequest.leagueNotes
        );

        return new EmptyResponse();
    }

    @Post('startNewSeason')
    @Roles(UserRole.Manager)
    async startNewSeason(
        @Req() request,
        @Body() startNewSeasonRequest: StartNewSeasonRequest
    ): Promise<EmptyResponse> {
        await this._managerDashboardService.startNewSeason(
            request.currentLeague.leagueId,
            startNewSeasonRequest.newSeasonNumber,
            startNewSeasonRequest.playingOnDate
        );

        return new EmptyResponse();
    }

    @Post('addWeek')
    @Roles(UserRole.Manager)
    async addWeek(
        @Req() request,
        @Body() addWeekRequest: AddWeekRequest
    ): Promise<EmptyResponse> {
        await this._managerDashboardService.addWeek(
            request.currentLeague.leagueId,
            addWeekRequest.seasonId,
            addWeekRequest.weekNumber,
            addWeekRequest.playingOnDate
        );

        return new EmptyResponse();
    }
}
