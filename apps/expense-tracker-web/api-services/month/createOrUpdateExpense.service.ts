import { useApiMutation } from '@clemann-developments/common-endpoint';
import {
    CreateOrUpdateExpenseRequest,
    CreateOrUpdateExpenseResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useCreateOrUpdateExpense(): UseMutationResult<
    CreateOrUpdateExpenseResponse,
    any,
    CreateOrUpdateExpenseRequest
> {
    return useApiMutation<
        CreateOrUpdateExpenseRequest,
        CreateOrUpdateExpenseResponse
    >('month/createOrUpdateExpense');
}
