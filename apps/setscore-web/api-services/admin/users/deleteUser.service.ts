import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

export class DeleteUserRequest {
    userId: string;
}

export default function useDeleteUser(): UseMutationResult<EmptyResponse> {
    return useApiMutation<DeleteUserRequest, EmptyResponse>(
        'admin/users/deleteUser'
    );
}
