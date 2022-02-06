import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../../../auth/auth-user.guard';
import { Roles } from '../../../auth/roles.decorator';
import { RolesGuard } from '../../../auth/roles.guard';
import { UserRole } from '../../../entities/user.entity';
import { GetLineupRequest, GetLineupResponse } from './player-lineup.dtos';
import { PlayerLineupService } from './player-lineup.service';

@Controller('player/lineup')
@UseGuards(AuthGuard('jwt'), AuthUserGuard, RolesGuard)
export class PlayerLineupController {
    constructor(private playerLineupService: PlayerLineupService) {}

    @Post('getLineup')
    @Roles(UserRole.Player, UserRole.Manager)
    public async getLineup(
        @Req() request,
        @Body() getLineupRequest: GetLineupRequest
    ): Promise<GetLineupResponse> {
        const weekLineupDto = await this.playerLineupService.getWeek(
            request.currentLeague.leagueId,
            getLineupRequest.seasonNumber,
            getLineupRequest.weekNumber
        );

        return {
            lineup: weekLineupDto
        };
    }
}
