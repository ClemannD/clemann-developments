import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { User } from '../../entities/user.entity';

export class GetUserRequest {
    userId: string;
}

export class GetUserResponse {
    user: User;
}

export default function useGetUser(): UseMutationResult<GetUserResponse> {
    return useApiMutation<GetUserRequest, GetUserResponse>(
        'admin/users/getUser'
    );
}
