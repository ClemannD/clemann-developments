import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../hooks/useApiMutation';

export class SetCurrentLeagueRequest {
    leagueId: string;
}

export default function useSetCurrentLeague(): UseMutationResult<
    EmptyResponse,
    any,
    SetCurrentLeagueRequest
> {
    return useApiMutation<SetCurrentLeagueRequest, EmptyResponse>(
        'auth/setCurrentLeague'
    );
}
