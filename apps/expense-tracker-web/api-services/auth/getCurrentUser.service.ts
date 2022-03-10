import { UseMutationResult } from 'react-query';

import {
    EmptyRequest,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { GetCurrentUserResponse } from '@clemann-developments/dtos/expense-tracker-dtos';

export default function useGetCurrentUser(): UseMutationResult<
    GetCurrentUserResponse,
    any,
    EmptyRequest
> {
    return useApiMutation<EmptyRequest, GetCurrentUserResponse>(
        'auth/getCurrentUser'
    );
}
