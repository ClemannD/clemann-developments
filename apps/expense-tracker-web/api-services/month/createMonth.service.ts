import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { CreateMonthRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useCreateMonth(): UseMutationResult<
    EmptyResponse,
    any,
    CreateMonthRequest
> {
    return useApiMutation<CreateMonthRequest, EmptyResponse>(
        'month/createMonth'
    );
}
