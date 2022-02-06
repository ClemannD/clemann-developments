import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { LeagueMemberType } from '../../entities/userToLeague.entity';

export class AddUserToLeagueRequest {
    userId: string;
    leagueId: string;
    leagueMemberType: LeagueMemberType;
}

export default function useAddUserToLeague(): UseMutationResult<
    EmptyResponse,
    any,
    AddUserToLeagueRequest
> {
    return useApiMutation<AddUserToLeagueRequest, EmptyResponse>(
        'admin/leagues/addUserToLeague'
    );
}
