import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../hooks/useApiMutation';

export class RegisterUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export default function useRegisterUser(): UseMutationResult<
    EmptyResponse,
    any,
    RegisterUserRequest
> {
    return useApiMutation<RegisterUserRequest, EmptyResponse>(
        'auth/registerUser'
    );
}
