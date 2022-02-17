import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';

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
