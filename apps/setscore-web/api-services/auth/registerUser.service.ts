import { UseMutationResult } from 'react-query';
import useApiMutation from '../../hooks/useApiMutation';

export class RegisterUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export class RegisterUserResponse {}

export default function useRegisterUser(): UseMutationResult<
    RegisterUserResponse,
    any,
    RegisterUserRequest
> {
    return useApiMutation<RegisterUserRequest, RegisterUserResponse>(
        'auth/registerUser'
    );
}
