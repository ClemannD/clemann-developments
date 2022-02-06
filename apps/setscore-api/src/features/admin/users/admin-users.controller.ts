import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../../../auth/auth-user.guard';
import { Roles } from '../../../auth/roles.decorator';
import { RolesGuard } from '../../../auth/roles.guard';
import { EmptyResponse } from '../../../common/empty-response';
import { UserRole } from '../../../entities/user.entity';
import {
    CreateUserRequest,
    DeleteUserRequest,
    EditUserRequest,
    GetUserRequest,
    GetUserResponse,
    ListUsersRequest,
    ListUsersResponse,
    UpdateUserRoleRequest
} from './admin-users.dto';
import { AdminUsersService } from './admin-users.service';

@Controller('admin/users')
@UseGuards(AuthGuard('jwt'), AuthUserGuard, RolesGuard)
export class AdminUsersController {
    constructor(private _adminUsersService: AdminUsersService) {}

    @Post('getUser')
    @Roles(UserRole.Admin)
    async getUser(
        @Body() getUserRequest: GetUserRequest
    ): Promise<GetUserResponse> {
        return {
            user: await this._adminUsersService.getUser(getUserRequest.userId)
        };
    }

    @Post('listUsers')
    @Roles(UserRole.Admin)
    async listUsers(
        @Body() listUsersRequest: ListUsersRequest
    ): Promise<ListUsersResponse> {
        const result = await this._adminUsersService.listUsers(
            listUsersRequest.paginationAndSort,
            listUsersRequest.filters
        );
        return {
            rows: result[0],
            totalCount: result[1]
        };
    }

    @Post('updateUserRole')
    @Roles(UserRole.Admin)
    async updateUserRole(
        @Body() updateUserRoleRequest: UpdateUserRoleRequest
    ): Promise<EmptyResponse> {
        await this._adminUsersService.updateUserRole(
            updateUserRoleRequest.userId,
            updateUserRoleRequest.role
        );

        return new EmptyResponse();
    }

    @Post('createUser')
    @Roles(UserRole.Admin)
    async createUser(
        @Body() createUserRequest: CreateUserRequest
    ): Promise<EmptyResponse> {
        await this._adminUsersService.createUser(
            createUserRequest.user.firstName,
            createUserRequest.user.lastName,
            createUserRequest.user.email,
            createUserRequest.user.phone
        );
        return new EmptyResponse();
    }

    @Post('editUser')
    @Roles(UserRole.Admin)
    async editUser(
        @Body() editUserRequest: EditUserRequest
    ): Promise<EmptyResponse> {
        await this._adminUsersService.editUser(
            editUserRequest.userId,
            editUserRequest.firstName,
            editUserRequest.lastName,
            editUserRequest.email,
            editUserRequest.phone
        );
        return new EmptyResponse();
    }

    @Post('deleteUser')
    @Roles(UserRole.Admin)
    async deleteUser(
        @Body() deleteUserRequest: DeleteUserRequest
    ): Promise<EmptyResponse> {
        await this._adminUsersService.deleteUser(deleteUserRequest.userId);
        return new EmptyResponse();
    }
}
