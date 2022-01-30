import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';

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
