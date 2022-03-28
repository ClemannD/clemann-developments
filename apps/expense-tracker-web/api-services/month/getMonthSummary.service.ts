import {
    EmptyRequest,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import {
    GetMonthSummaryRequest,
    GetMonthSummaryResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useGetMonthSummary(): UseMutationResult<
    GetMonthSummaryResponse,
    any,
    GetMonthSummaryRequest
> {
    return useApiMutation<GetMonthSummaryRequest, GetMonthSummaryResponse>(
        'month/getMonthSummary'
    );
}
