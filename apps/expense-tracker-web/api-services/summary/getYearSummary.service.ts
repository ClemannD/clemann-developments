import {
    EmptyRequest,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import {
    GetYearSummaryRequest,
    GetYearSummaryResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useGetYearSummary(): UseMutationResult<
    GetYearSummaryResponse,
    any,
    GetYearSummaryRequest
> {
    return useApiMutation<GetYearSummaryRequest, GetYearSummaryResponse>(
        'summary/getYearSummary'
    );
}
