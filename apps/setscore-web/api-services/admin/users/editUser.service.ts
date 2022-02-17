import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';

export class EditUserRequest {
    userId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export default function useEditUser(): UseMutationResult<EmptyResponse> {
    return useApiMutation<EditUserRequest, EmptyResponse>(
        'admin/users/editUser'
    );
}
