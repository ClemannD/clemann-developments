import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { UserRole } from '../../entities/user.entity';

export class UpdateUserRoleRequest {
    userId: string;
    role: UserRole;
}

export class UpdateUserRoleResponse {}

export default function useUpdateUserRole(): UseMutationResult<UpdateUserRoleResponse> {
    return useApiMutation<UpdateUserRoleRequest, UpdateUserRoleResponse>(
        'admin/users/updateUserRole'
    );
}
