import { User } from '../entities/user.entity';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../hooks/useApiMutation';
import { League } from '../entities/league.entity';

export class GetCurrentUserRequest {}

export class GetCurrentUserResponse {
    user: User;
    currentLeague: League;
}

export default function useGetCurrentUser(): UseMutationResult<
    GetCurrentUserResponse,
    any,
    GetCurrentUserRequest
> {
    return useApiMutation<GetCurrentUserRequest, GetCurrentUserResponse>(
        'auth/getCurrentUser'
    );
}
