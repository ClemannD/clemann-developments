import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { User } from '../../entities/user.entity';

export class CreateUserRequest {
    user: User;
}

export class CreateUserResponse {}

export default function useCreateUser(): UseMutationResult<CreateUserResponse> {
    return useApiMutation<CreateUserRequest, CreateUserResponse>(
        'admin/users/createUser'
    );
}
