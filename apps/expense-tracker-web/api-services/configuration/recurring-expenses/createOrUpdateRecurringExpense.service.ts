import { useApiMutation } from '@clemann-developments/common-endpoint';
import {
    CreateOrUpdateRecurringExpenseRequest,
    CreateOrUpdateRecurringExpenseResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useCreateOrUpdateRecurringExpense(): UseMutationResult<
    CreateOrUpdateRecurringExpenseResponse,
    any,
    CreateOrUpdateRecurringExpenseRequest
> {
    return useApiMutation<
        CreateOrUpdateRecurringExpenseRequest,
        CreateOrUpdateRecurringExpenseResponse
    >('configuration/createOrUpdateRecurringExpense');
}
