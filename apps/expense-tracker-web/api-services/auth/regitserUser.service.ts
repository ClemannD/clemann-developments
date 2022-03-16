import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { RegisterUserRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useRegisterUser(): UseMutationResult<
    EmptyResponse,
    any,
    RegisterUserRequest
> {
    return useApiMutation<RegisterUserRequest, EmptyResponse>(
        'auth/registerUser'
    );
}
