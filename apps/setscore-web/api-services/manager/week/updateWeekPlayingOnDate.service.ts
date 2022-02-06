import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

export class UpdateWeekPlayingOnDateRequest {
    weekId: string;
    playingOnDate: Date;
}

export default function useUpdateWeekPlayingOnDate(): UseMutationResult<
    EmptyResponse,
    any,
    UpdateWeekPlayingOnDateRequest
> {
    return useApiMutation<UpdateWeekPlayingOnDateRequest, EmptyResponse>(
        'manager/week/updateWeekPlayingOnDate'
    );
}
