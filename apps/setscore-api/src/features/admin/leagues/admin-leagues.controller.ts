import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminLeaguesService } from './admin-leagues.service';
import {
    AddUserToLeagueRequest,
    CreateLeagueRequest,
    CreateUserForLeagueRequest,
    DeleteLeagueRequest,
    GetLeagueRequest,
    GetLeagueResponse,
    ListLeaguesRequest,
    ListLeaguesResponse,
    RemoveUserFromLeagueRequest,
    UpdateLeagueRequest
} from './admin-leagues.dto';
import { AuthUserGuard } from '../../../auth/auth-user.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/roles.decorator';
import { UserRole } from '../../../entities/user.entity';
import { EmptyResponse } from '../../../common/empty-response';

@Controller('admin/leagues')
@UseGuards(AuthGuard('jwt'), AuthUserGuard, RolesGuard)
export class AdminLeaguesController {
    constructor(private _adminLeagueService: AdminLeaguesService) {}

    @Post('listLeagues')
    @Roles(UserRole.Admin)
    async listLeagues(
        @Body() listLeaguesRequest: ListLeaguesRequest
    ): Promise<ListLeaguesResponse> {
        const result = await this._adminLeagueService.listLeagues(
            listLeaguesRequest.paginationAndSort,
            listLeaguesRequest.filters
        );
        return {
            rows: result[0],
            totalCount: result[1]
        };
    }

    @Post('getLeague')
    @Roles(UserRole.Admin)
    async getLeague(
        @Body() getLeagueRequest: GetLeagueRequest
    ): Promise<GetLeagueResponse> {
        return {
            league: await this._adminLeagueService.getLeague(
                getLeagueRequest.leagueId
            )
        };
    }

    @Post('createLeague')
    @Roles(UserRole.Admin)
    async createLeague(
        @Body() createLeagueRequest: CreateLeagueRequest
    ): Promise<EmptyResponse> {
        await this._adminLeagueService.createLeague(
            createLeagueRequest.name,
            createLeagueRequest.state,
            createLeagueRequest.city
        );
        return new EmptyResponse();
    }

    @Post('updateLeague')
    @Roles(UserRole.Admin)
    async updateLeague(
        @Body() updateLeagueRequest: UpdateLeagueRequest
    ): Promise<EmptyResponse> {
        await this._adminLeagueService.updateLeague(
            updateLeagueRequest.leagueId,
            updateLeagueRequest.name,
            updateLeagueRequest.state,
            updateLeagueRequest.city
        );
        return new EmptyResponse();
    }

    @Post('deleteLeague')
    @Roles(UserRole.Admin)
    async deleteLeague(
        @Body() deleteLeagueRequest: DeleteLeagueRequest
    ): Promise<EmptyResponse> {
        await this._adminLeagueService.deleteLeague(
            deleteLeagueRequest.leagueId
        );
        return new EmptyResponse();
    }

    @Post('addUserToLeague')
    @Roles(UserRole.Admin)
    async addUserToLeague(
        @Body() addUserToLeagueRequest: AddUserToLeagueRequest
    ): Promise<EmptyResponse> {
        await this._adminLeagueService.addUserToLeague(
            addUserToLeagueRequest.userId,
            addUserToLeagueRequest.leagueId,
            addUserToLeagueRequest.leagueMemberType
        );
        return new EmptyResponse();
    }

    @Post('removeUserFromLeague')
    @Roles(UserRole.Admin)
    async removeUserFromLeague(
        @Body() removeUserFromLeagueRequest: RemoveUserFromLeagueRequest
    ): Promise<EmptyResponse> {
        await this._adminLeagueService.removeUserFromLeague(
            removeUserFromLeagueRequest.userId,
            removeUserFromLeagueRequest.leagueId
        );
        return new EmptyResponse();
    }

    @Post('createUserForLeague')
    @UseGuards(AuthGuard('jwt'), AuthUserGuard, RolesGuard)
    @Roles(UserRole.Admin)
    async createUser(
        @Body() createUserForLeagueRequest: CreateUserForLeagueRequest
    ): Promise<EmptyResponse> {
        await this._adminLeagueService.createUserForLeague(
            createUserForLeagueRequest.leagueId,
            createUserForLeagueRequest.firstName,
            createUserForLeagueRequest.lastName,
            createUserForLeagueRequest.phone,
            createUserForLeagueRequest.email,
            createUserForLeagueRequest.leagueMemberType
        );
        return new EmptyResponse();
    }
}
