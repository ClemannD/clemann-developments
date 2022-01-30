import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';

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
