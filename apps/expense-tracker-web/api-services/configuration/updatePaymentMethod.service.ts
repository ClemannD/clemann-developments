import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { UpdatePaymentMethodRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useUpdatePaymentMethod(): UseMutationResult<
    EmptyResponse,
    any,
    UpdatePaymentMethodRequest
> {
    return useApiMutation<UpdatePaymentMethodRequest, EmptyResponse>(
        'configuration/updatePaymentMethod'
    );
}
