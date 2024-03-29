import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';

export class DeleteLeagueRequest {
    leagueId: string;
}

export default function useDeleteLeague(): UseMutationResult<
    EmptyResponse,
    any,
    DeleteLeagueRequest
> {
    return useApiMutation<DeleteLeagueRequest, EmptyResponse>(
        'admin/leagues/deleteLeague'
    );
}
