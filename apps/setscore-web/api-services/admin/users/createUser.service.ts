import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { User } from '../../entities/user.entity';

export class CreateUserRequest {
    user: User;
}

export default function useCreateUser(): UseMutationResult<EmptyResponse> {
    return useApiMutation<CreateUserRequest, EmptyResponse>(
        'admin/users/createUser'
    );
}
