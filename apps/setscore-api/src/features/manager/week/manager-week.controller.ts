import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../../../auth/auth-user.guard';
import { Roles } from '../../../auth/roles.decorator';
import { RolesGuard } from '../../../auth/roles.guard';
import { EmptyResponse } from '../../../common/empty-response';
import { UserRole } from '../../../entities/user.entity';
import {
    CreateCourtForWeekRequest,
    CreateOrUpdateSetRequest,
    GetWeekRequest,
    GetWeekResponse,
    UpdateCourtOrderRequest,
    UpdatePlayerAdjustedTotalRequest
} from './manager-week.dtos';
import { ManagerWeekService } from './manager-week.service';

@Controller('manager/week')
@UseGuards(AuthGuard('jwt'), AuthUserGuard, RolesGuard)
export class ManagerWeekController {
    constructor(private _managerWeekService: ManagerWeekService) {}

    @Post('getWeek')
    @Roles(UserRole.Manager)
    async getWeek(
        @Req() request,
        @Body() getWeekRequest: GetWeekRequest
    ): Promise<GetWeekResponse> {
        const weekDto = await this._managerWeekService.getWeek(
            request.currentLeague.leagueId,
            getWeekRequest.weekId
        );

        return {
            week: weekDto
        };
    }

    @Post('updateWeekPlayingOnDate')
    @Roles(UserRole.Manager)
    async updateWeekPlayingOnDate(
        @Req() request,
        @Body()
        updateWeekPlayingOnDateRequest: {
            weekId: string;
            playingOnDate: Date;
        }
    ): Promise<EmptyResponse> {
        await this._managerWeekService.updateWeekPlayingOnDate(
            request.currentLeague.leagueId,
            updateWeekPlayingOnDateRequest.weekId,
            updateWeekPlayingOnDateRequest.playingOnDate
        );

        return new EmptyResponse();
    }

    @Post('createCourtForWeek')
    @Roles(UserRole.Manager)
    async createCourtForWeek(
        @Req() request,
        @Body() addCourtToWeekRequest: CreateCourtForWeekRequest
    ): Promise<EmptyResponse> {
        await this._managerWeekService.createCourtForWeek(
            request.currentLeague.leagueId,
            addCourtToWeekRequest.weekId,
            addCourtToWeekRequest.courtNumber
        );

        return new EmptyResponse();
    }

    @Post('updateCourtNumber')
    @Roles(UserRole.Manager)
    async updateCourtNumber(
        @Req() request,
        @Body()
        updateCourtNumberRequest: {
            courtId: string;
            courtNumber: number;
        }
    ): Promise<EmptyResponse> {
        await this._managerWeekService.updateCourtNumber(
            request.currentLeague.leagueId,
            updateCourtNumberRequest.courtId,
            updateCourtNumberRequest.courtNumber
        );

        return new EmptyResponse();
    }

    @Post('updateCourtOrder')
    @Roles(UserRole.Manager)
    async updateCourtOrder(
        @Req() request,
        @Body()
        updateCourtOrderRequest: UpdateCourtOrderRequest
    ): Promise<EmptyResponse> {
        await this._managerWeekService.updateCourtOrder(
            request.currentLeague.leagueId,
            updateCourtOrderRequest.courtPositions
        );

        return new EmptyResponse();
    }

    @Post('deleteCourt')
    @Roles(UserRole.Manager)
    async deleteCourt(
        @Req() request,
        @Body()
        deleteCourtRequest: {
            courtId: string;
        }
    ): Promise<EmptyResponse> {
        await this._managerWeekService.deleteCourt(
            request.currentLeague.leagueId,
            deleteCourtRequest.courtId
        );

        return new EmptyResponse();
    }

    @Post('createOrUpdateSet')
    @Roles(UserRole.Manager)
    async createOrUpdateSet(
        @Req() request,
        @Body() createOrUpdateSetRequest: CreateOrUpdateSetRequest
    ): Promise<EmptyResponse> {
        await this._managerWeekService.createOrUpdateSet(
            request.currentLeague.leagueId,
            createOrUpdateSetRequest.courtId,
            createOrUpdateSetRequest.set
        );

        return new EmptyResponse();
    }

    @Post('updatePlayerAdjustedTotal')
    @Roles(UserRole.Manager)
    async updatePlayerAdjustedTotal(
        @Req() request,
        @Body()
        updatePlayerAdjustedTotalRequest: UpdatePlayerAdjustedTotalRequest
    ): Promise<EmptyResponse> {
        await this._managerWeekService.updatePlayerAdjustedTotal(
            request.currentLeague.leagueId,
            updatePlayerAdjustedTotalRequest.playerId,
            updatePlayerAdjustedTotalRequest.adjustedTotal
        );

        return new EmptyResponse();
    }
}
