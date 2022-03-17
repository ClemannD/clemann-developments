import {
    EmptyRequest,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { GetMonthResponse } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useGetMonth(): UseMutationResult<
    GetMonthResponse,
    any,
    EmptyRequest
> {
    return useApiMutation<EmptyRequest, GetMonthResponse>('month/getMonth');
}
