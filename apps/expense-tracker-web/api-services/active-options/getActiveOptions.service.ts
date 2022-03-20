import {
    EmptyRequest,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { GetActiveOptionsResponse } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useGetActiveOptions(): UseMutationResult<
    GetActiveOptionsResponse,
    any,
    EmptyRequest
> {
    return useApiMutation<EmptyRequest, GetActiveOptionsResponse>(
        'active-options/getActiveOptions'
    );
}
