import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

export class DeleteLeagueRequest {
    leagueId: string;
}

export class DeleteLeagueResponse {}

export default function useDeleteLeague(): UseMutationResult<
    DeleteLeagueResponse,
    any,
    DeleteLeagueRequest
> {
    return useApiMutation<DeleteLeagueRequest, DeleteLeagueResponse>(
        'admin/leagues/deleteLeague'
    );
}
