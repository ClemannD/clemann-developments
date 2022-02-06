import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { UserRole } from '../../entities/user.entity';

export class UpdateUserRoleRequest {
    userId: string;
    role: UserRole;
}

export default function useUpdateUserRole(): UseMutationResult<EmptyResponse> {
    return useApiMutation<UpdateUserRoleRequest, EmptyResponse>(
        'admin/users/updateUserRole'
    );
}
