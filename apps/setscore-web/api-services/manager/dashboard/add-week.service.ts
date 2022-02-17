import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';

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
