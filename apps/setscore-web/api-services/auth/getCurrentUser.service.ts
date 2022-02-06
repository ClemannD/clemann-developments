import { User } from '../entities/user.entity';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../hooks/useApiMutation';
import { League } from '../entities/league.entity';
import { EmptyRequest } from '@clemann-developments/common-endpoint';

export class GetCurrentUserResponse {
    user: User;
    currentLeague: League;
}

export default function useGetCurrentUser(): UseMutationResult<
    GetCurrentUserResponse,
    any,
    EmptyRequest
> {
    return useApiMutation<EmptyRequest, GetCurrentUserResponse>(
        'auth/getCurrentUser'
    );
}
