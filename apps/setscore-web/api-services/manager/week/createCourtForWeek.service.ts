import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';

export class CreateCourtForWeekRequest {
    weekId: string;
    courtNumber: number;
}

export default function useCreateCourtForWeek(): UseMutationResult<
    EmptyResponse,
    any,
    CreateCourtForWeekRequest
> {
    return useApiMutation<CreateCourtForWeekRequest, EmptyResponse>(
        'manager/week/createCourtForWeek'
    );
}
