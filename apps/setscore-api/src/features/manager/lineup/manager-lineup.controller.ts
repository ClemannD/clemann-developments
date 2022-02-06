import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../../../auth/auth-user.guard';
import { Roles } from '../../../auth/roles.decorator';
import { RolesGuard } from '../../../auth/roles.guard';
import { EmptyResponse } from '../../../common/empty-response';
import { UserRole } from '../../../entities/user.entity';
import {
    GetLineupRequest,
    GetLineupResponse,
    ListSubsResponse,
    UpdateLineupRequest,
    UpdatePlayerSubRequest
} from './manager-lineup.dtos';
import { ManagerLineupService } from './manager-lineup.service';

@Controller('manager/lineup')
@UseGuards(AuthGuard('jwt'), AuthUserGuard, RolesGuard)
export class ManagerLineupController {
    constructor(private _managerLineupService: ManagerLineupService) {}

    @Post('getLineup')
    @Roles(UserRole.Manager)
    async getLineup(
        @Req() request,
        @Body() getLineupRequest: GetLineupRequest
    ): Promise<GetLineupResponse> {
        const lineupDto = await this._managerLineupService.getLineup(
            request.currentLeague.leagueId,
            getLineupRequest.weekId
        );

        return {
            lineup: lineupDto
        };
    }

    @Post('updateLineup')
    @Roles(UserRole.Manager)
    async updateLineup(
        @Req() request,
        @Body() updateLineupRequest: UpdateLineupRequest
    ): Promise<EmptyResponse> {
        await this._managerLineupService.updateLineup(
            request.currentLeague.leagueId,
            updateLineupRequest.weekId,
            updateLineupRequest.courts
        );

        return new EmptyResponse();
    }

    @Post('listSubs')
    @Roles(UserRole.Manager)
    async listSubs(@Req() request): Promise<ListSubsResponse> {
        const subs = await this._managerLineupService.listSubs(
            request.currentLeague.leagueId
        );

        return {
            subs
        };
    }

    @Post('updatePlayerSub')
    @Roles(UserRole.Manager)
    async updatePlayerSub(
        @Req() request,
        @Body() updatePlayerSubRequest: UpdatePlayerSubRequest
    ): Promise<EmptyResponse> {
        await this._managerLineupService.updatePlayerSub(
            request.currentLeague.leagueId,
            updatePlayerSubRequest.playerId,
            updatePlayerSubRequest.subUserId,
            updatePlayerSubRequest.subReason
        );

        return new EmptyResponse();
    }
}
