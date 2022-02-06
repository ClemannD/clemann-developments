import {
    ListRequest,
    ListResponse
} from '@clemann-developments/common-endpoint';
import { User, UserRole } from '../../../entities/user.entity';

export class ListUsersRequest extends ListRequest {}
export class ListUsersResponse extends ListResponse<User> {}

export class GetUserRequest {
    userId: string;
}

export class GetUserResponse {
    user: User;
}

export class CreateUserRequest {
    user: User;
}

export class EditUserRequest {
    userId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export class DeleteUserRequest {
    userId: string;
}

export class UpdateUserRoleRequest {
    userId: string;
    role: UserRole;
}

export class UpdateUserRoleResponse {}
