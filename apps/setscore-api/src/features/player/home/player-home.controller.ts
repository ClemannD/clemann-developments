import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth0UserGuard } from '../../../auth/auth0.guard';
import { Roles } from '../../../auth/roles.decorator';
import { RolesGuard } from '../../../auth/roles.guard';
import { UserRole } from '../../../entities/user.entity';
import { GetCurrentWeekResponse } from './player-home.dtos';
import { PlayerHomeService } from './player-home.service';

@Controller('player/home')
@UseGuards(AuthGuard('jwt'), Auth0UserGuard, RolesGuard)
export class PlayerHomeController {
    constructor(private playerHomeService: PlayerHomeService) {}

    @Post('getCurrentWeek')
    @Roles(UserRole.Player, UserRole.Manager)
    public async getCurrentWeek(
        @Req() request
    ): Promise<GetCurrentWeekResponse> {
        if (!request.currentLeague) {
            return {};
        }
        return await this.playerHomeService.getCurrentWeek(
            request.currentLeague.leagueId,
            request.userInfo.userId
        );
    }
}
