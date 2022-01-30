import useApiMutation from '../../../hooks/useApiMutation';
import { UseMutationResult } from 'react-query';

export class RemoveUserFromLeagueRequest {
    userId: string;
    leagueId: string;
}

export class RemoveUserFromLeagueResponse {}

export default function useRemoveUserFromLeague(): UseMutationResult<
    RemoveUserFromLeagueResponse,
    any,
    RemoveUserFromLeagueRequest
> {
    return useApiMutation<
        RemoveUserFromLeagueRequest,
        RemoveUserFromLeagueResponse
    >('admin/leagues/removeUserFromLeague');
}
