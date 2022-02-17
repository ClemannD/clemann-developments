import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';

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
