import { EmptyResponse } from '@clemann-developments/common-endpoint';
import {
    CurrentUserDto,
    GetCurrentUserResponse,
    RegisterUserRequest
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../entities/user.entity';
import { AuthUserGuard } from './auth-user.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@UseGuards(AuthGuard('jwt'), AuthUserGuard)
export class AuthController {
    constructor(private _authService: AuthService) {}

    @Post('getCurrentUser')
    public getCurrentUser(
        @Req() request: { userInfo: User }
    ): GetCurrentUserResponse {
        const currentUser = new CurrentUserDto();

        currentUser.userId = request.userInfo.userId;
        currentUser.firstName = request.userInfo.firstName;
        currentUser.lastName = request.userInfo.lastName;
        currentUser.email = request.userInfo.email;
        currentUser.phone = request.userInfo.phone;
        currentUser.accountId = request.userInfo.account?.accountId;
        currentUser.accountName = request.userInfo.account?.accountName;

        return {
            user: currentUser
        };
    }

    @Post('registerUser')
    public async registerUser(
        @Body() registerUserRequest: RegisterUserRequest,
        @Req() request: { userInfo: User }
    ): Promise<EmptyResponse> {
        await this._authService.registerUser(
            request.userInfo.userId,
            registerUserRequest.firstName,
            registerUserRequest.lastName,
            registerUserRequest.email,
            registerUserRequest.phone,
            registerUserRequest.accountName
        );
        return new EmptyResponse();
    }
}
