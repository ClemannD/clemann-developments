import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

export class DeleteUserRequest {
    userId: string;
}

export class DeleteUserResponse {}

export default function useDeleteUser(): UseMutationResult<DeleteUserResponse> {
    return useApiMutation<DeleteUserRequest, DeleteUserResponse>(
        'admin/users/deleteUser'
    );
}
