import { UseMutationResult } from 'react-query';
import useApiMutation from '../../hooks/useApiMutation';

export class SetCurrentLeagueRequest {
    leagueId: string;
}

export class SetCurrentLeagueResponse {}

export default function useSetCurrentLeague(): UseMutationResult<
    SetCurrentLeagueResponse,
    any,
    SetCurrentLeagueRequest
> {
    return useApiMutation<SetCurrentLeagueRequest, SetCurrentLeagueResponse>(
        'auth/setCurrentLeague'
    );
}
