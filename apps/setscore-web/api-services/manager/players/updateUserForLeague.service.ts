import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';
import { User } from '../../entities/user.entity';
import { LeagueMemberType } from '../../entities/userToLeague.entity';

export class UpdateUserForLeagueRequest {
    leagueId: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    leagueMemberType: LeagueMemberType;
}

export class UpdateUserForLeagueResponse {
    user: User;
}

export default function useUpdateUserForLeague(): UseMutationResult<
    UpdateUserForLeagueResponse,
    any,
    UpdateUserForLeagueRequest
> {
    return useApiMutation<
        UpdateUserForLeagueRequest,
        UpdateUserForLeagueResponse
    >('manager/players/updateUserForLeague');
}
