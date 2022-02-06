import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../../../auth/auth-user.guard';
import { Roles } from '../../../auth/roles.decorator';
import { RolesGuard } from '../../../auth/roles.guard';
import { UserRole } from '../../../entities/user.entity';
import {
    CreatePlayerRequest,
    EditPlayerRequest,
    ListPlayersRequest,
    ListPlayersResponse,
    RemovePlayerRequest
} from './manager-players.dto';
import { ManagerPlayersService } from './manager-players.service';

@Controller('manager/players')
@UseGuards(AuthGuard('jwt'), AuthUserGuard, RolesGuard)
export class ManagerPlayersController {
    constructor(private _managerPlayersService: ManagerPlayersService) {}

    @Post('listPlayers')
    @Roles(UserRole.Manager)
    async listPlayers(
        @Req() request,
        @Body() listPlayersRequest: ListPlayersRequest
    ): Promise<ListPlayersResponse> {
        const result = await this._managerPlayersService.listPlayers(
            request.currentLeague.leagueId,
            listPlayersRequest.paginationAndSort,
            listPlayersRequest.filters
        );
        return {
            rows: result[0],
            totalCount: result[1]
        };
    }

    @Post('createPlayer')
    @Roles(UserRole.Manager)
    async createPlayer(
        @Req() request,
        @Body() createPlayerRequest: CreatePlayerRequest
    ): Promise<EmptyResponse> {
        await this._managerPlayersService.createPlayer(
            request.currentLeague.leagueId,
            createPlayerRequest.firstName,
            createPlayerRequest.lastName,
            createPlayerRequest.email,
            createPlayerRequest.phone,
            createPlayerRequest.leagueMemberType
        );
        return new EmptyResponse();
    }

    @Post('editPlayer')
    @Roles(UserRole.Manager)
    async editPlayer(
        @Req() request,
        @Body() editPlayerRequest: EditPlayerRequest
    ): Promise<EmptyResponse> {
        await this._managerPlayersService.editPlayer(
            request.currentLeague.leagueId,
            editPlayerRequest.userId,
            editPlayerRequest.firstName,
            editPlayerRequest.lastName,
            editPlayerRequest.email,
            editPlayerRequest.phone,
            editPlayerRequest.leagueMemberType
        );
        return new EmptyResponse();
    }

    @Post('removePlayer')
    @Roles(UserRole.Manager)
    async removePlayer(
        @Req() request,
        @Body() removePlayerRequest: RemovePlayerRequest
    ): Promise<EmptyResponse> {
        await this._managerPlayersService.removePlayer(
            request.currentLeague.leagueId,
            removePlayerRequest.userId
        );
        return new EmptyResponse();
    }
}
