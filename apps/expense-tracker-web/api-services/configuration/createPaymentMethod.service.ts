import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { CreatePaymentMethodRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useCreatePaymentMethod(): UseMutationResult<
    EmptyResponse,
    any,
    CreatePaymentMethodRequest
> {
    return useApiMutation<CreatePaymentMethodRequest, EmptyResponse>(
        'configuration/createPaymentMethod'
    );
}
