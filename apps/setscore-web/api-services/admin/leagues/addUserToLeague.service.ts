import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { LeagueMemberType } from '../../entities/userToLeague.entity';

export class AddUserToLeagueRequest {
    userId: string;
    leagueId: string;
    leagueMemberType: LeagueMemberType;
}

export class AddUserToLeagueResponse {}

export default function useAddUserToLeague(): UseMutationResult<
    AddUserToLeagueResponse,
    any,
    AddUserToLeagueRequest
> {
    return useApiMutation<AddUserToLeagueRequest, AddUserToLeagueResponse>(
        'admin/leagues/addUserToLeague'
    );
}
