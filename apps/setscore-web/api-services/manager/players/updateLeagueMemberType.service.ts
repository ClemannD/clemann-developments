import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { LeagueMemberType } from '../../entities/userToLeague.entity';

export class UpdateLeagueMemberTypeRequest {
    userId: string;
    leagueId: string;
    leagueMemberType: LeagueMemberType;
}

export class UpdateLeagueMemberTypeResponse {}

export default function useUpdateLeagueMemberType(): UseMutationResult<
    UpdateLeagueMemberTypeResponse,
    any,
    UpdateLeagueMemberTypeRequest
> {
    return useApiMutation<
        UpdateLeagueMemberTypeRequest,
        UpdateLeagueMemberTypeResponse
    >('manager/players/updateLeagueMemberType');
}
