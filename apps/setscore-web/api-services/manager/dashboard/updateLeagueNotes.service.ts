import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';

export class UpdateLeagueNotesRequest {
    leagueNotes: string;
}

export default function useUpdateLeagueNotes(): UseMutationResult<
    EmptyResponse,
    any,
    UpdateLeagueNotesRequest
> {
    return useApiMutation<UpdateLeagueNotesRequest, EmptyResponse>(
        'manager/dashboard/updateLeagueNotes'
    );
}
