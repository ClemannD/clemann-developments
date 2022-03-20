import {
    EmptyRequest,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { GetPaymentMethodsResponse } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useGetPaymentMethods(): UseMutationResult<
    GetPaymentMethodsResponse,
    any,
    EmptyRequest
> {
    return useApiMutation<EmptyRequest, GetPaymentMethodsResponse>(
        'configuration/getPaymentMethods'
    );
}
