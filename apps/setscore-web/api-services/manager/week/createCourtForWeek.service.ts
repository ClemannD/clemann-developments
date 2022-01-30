import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';

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
