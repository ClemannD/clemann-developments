import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth0UserGuard } from './auth0.guard';
import {
    AcceptInviteCodeRequest,
    GetCurrentUserResponse,
    RegisterUserRequest,
    SetCurrentLeagueRequest
} from './auth.dto';
import { AuthService } from './auth.service';
import { EmptyResponse } from '../common/empty-response';

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) {}

    @Post('getCurrentUser')
    @UseGuards(AuthGuard('jwt'), Auth0UserGuard)
    getCurrentUser(@Req() request): GetCurrentUserResponse {
        return {
            user: request.userInfo,
            currentLeague: request.currentLeague
        };
    }

    @Post('setCurrentLeague')
    @UseGuards(AuthGuard('jwt'), Auth0UserGuard)
    async setCurrentLeague(
        @Req() request,
        @Body() setCurrentLeagueRequest: SetCurrentLeagueRequest
    ): Promise<EmptyResponse> {
        await this._authService.setCurrentLeague(
            setCurrentLeagueRequest.leagueId,
            request.userInfo.userId
        );
        return new EmptyResponse();
    }

    @Post('acceptInviteCode')
    @UseGuards(AuthGuard('jwt'), Auth0UserGuard)
    async acceptInviteCode(
        @Req() request,
        @Body() acceptInviteCodeRequest: AcceptInviteCodeRequest
    ): Promise<EmptyResponse> {
        await this._authService.acceptInviteCode(
            request.userInfo.userId,
            acceptInviteCodeRequest.inviteCode
        );
        return new EmptyResponse();
    }

    @Post('registerUser')
    @UseGuards(AuthGuard('jwt'), Auth0UserGuard)
    async register(
        @Req() request,
        @Body() registerUserRequest: RegisterUserRequest
    ): Promise<EmptyResponse> {
        await this._authService.registerUser(
            request.userInfo.userId,
            registerUserRequest.firstName,
            registerUserRequest.lastName,
            registerUserRequest.email,
            registerUserRequest.phone
        );
        return new EmptyResponse();
    }
}
