import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';
import { LeagueMemberType } from '../../entities/userToLeague.entity';

export class CreateUserForLeagueRequest {
    leagueId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    leagueMemberType: LeagueMemberType;
}

export default function useCreateUserForLeague(): UseMutationResult<
    EmptyResponse,
    any,
    CreateUserForLeagueRequest
> {
    return useApiMutation<CreateUserForLeagueRequest, EmptyResponse>(
        'admin/leagues/createUserForLeague'
    );
}
