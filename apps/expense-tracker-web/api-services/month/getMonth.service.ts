import {
    EmptyRequest,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import {
    GetMonthRequest,
    GetMonthResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useGetMonth(): UseMutationResult<
    GetMonthResponse,
    any,
    GetMonthRequest
> {
    return useApiMutation<GetMonthRequest, GetMonthResponse>('month/getMonth');
}
