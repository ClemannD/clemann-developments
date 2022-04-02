import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { DeleteRecurringExpenseRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useDeleteRecurringExpense(): UseMutationResult<
    EmptyResponse,
    any,
    DeleteRecurringExpenseRequest
> {
    return useApiMutation<DeleteRecurringExpenseRequest, EmptyResponse>(
        'configuration/deleteRecurringExpense'
    );
}
