import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { DeleteExpenseRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useDeleteExpense(): UseMutationResult<
    EmptyResponse,
    any,
    DeleteExpenseRequest
> {
    return useApiMutation<DeleteExpenseRequest, EmptyResponse>(
        'month/deleteExpense'
    );
}
