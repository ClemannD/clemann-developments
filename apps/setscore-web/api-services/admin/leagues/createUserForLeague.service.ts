import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { LeagueMemberType } from '../../entities/userToLeague.entity';

export class CreateUserForLeagueRequest {
    leagueId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    leagueMemberType: LeagueMemberType;
}

export class CreateUserForLeagueResponse {}

export default function useCreateUserForLeague(): UseMutationResult<
    CreateUserForLeagueResponse,
    any,
    CreateUserForLeagueRequest
> {
    return useApiMutation<
        CreateUserForLeagueRequest,
        CreateUserForLeagueResponse
    >('admin/leagues/createUserForLeague');
}
