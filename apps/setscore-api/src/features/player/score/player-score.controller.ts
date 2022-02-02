import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth0UserGuard } from '../../../auth/auth0.guard';
import { Roles } from '../../../auth/roles.decorator';
import { RolesGuard } from '../../../auth/roles.guard';
import { UserRole } from '../../../entities/user.entity';
import {
    GetCurrentCourtResponse,
    SetScoreRequest,
    SetScoreResponse
} from './player-score.dtos';
import { PlayerScoreService } from './player-score.service';

@Controller('player/score')
@UseGuards(AuthGuard('jwt'), Auth0UserGuard, RolesGuard)
export class PlayerScoreController {
    constructor(private playerScoreService: PlayerScoreService) {}

    @Post('getCurrentCourt')
    @Roles(UserRole.Player, UserRole.Manager)
    async getScoreDetails(@Req() req): Promise<GetCurrentCourtResponse> {
        if (!req.currentLeague) {
            return {
                currentCourt: null
            };
        }
        const currentCourt = await this.playerScoreService.getCurrentCourt(
            req.userInfo.userId,
            req.currentLeague.leagueId
        );

        return {
            currentCourt
        };
    }

    @Post('setScore')
    @Roles(UserRole.Player, UserRole.Manager)
    async setScore(
        @Req() req,
        @Body() setScoreRequest: SetScoreRequest
    ): Promise<SetScoreResponse> {
        const repeatedSetEntry = await this.playerScoreService.setScore(
            req.currentLeague.leagueId,
            req.userInfo.userId,
            setScoreRequest.setScore
        );

        return {
            repeatedSetEntry
        };
    }
}
