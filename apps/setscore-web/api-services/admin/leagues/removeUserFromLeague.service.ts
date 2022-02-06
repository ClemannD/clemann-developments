import useApiMutation from '../../../hooks/useApiMutation';
import { UseMutationResult } from 'react-query';
import { EmptyResponse } from '@clemann-developments/common-endpoint';

export class RemoveUserFromLeagueRequest {
    userId: string;
    leagueId: string;
}

export default function useRemoveUserFromLeague(): UseMutationResult<
    EmptyResponse,
    any,
    RemoveUserFromLeagueRequest
> {
    return useApiMutation<RemoveUserFromLeagueRequest, EmptyResponse>(
        'admin/leagues/removeUserFromLeague'
    );
}
