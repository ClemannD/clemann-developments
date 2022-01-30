import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

export class EditUserRequest {
    userId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export class EditUserResponse {}

export default function useEditUser(): UseMutationResult<EditUserResponse> {
    return useApiMutation<EditUserRequest, EditUserResponse>(
        'admin/users/editUser'
    );
}
