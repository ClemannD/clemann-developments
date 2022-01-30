import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';

export class AddWeekRequest {
    seasonId: string;
    weekNumber: number;
    playingOnDate: Date;
}

export default function useAddWeek(): UseMutationResult<
    EmptyResponse,
    any,
    AddWeekRequest
> {
    return useApiMutation<AddWeekRequest, EmptyResponse>(
        'manager/dashboard/addWeek'
    );
}
