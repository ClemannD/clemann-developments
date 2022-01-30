import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { User } from '../../entities/user.entity';
import { LeagueMemberType } from '../../entities/userToLeague.entity';

export class CreatePlayerRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    leagueMemberType: LeagueMemberType;
}

export class CreatePlayerResponse {
    user: User;
}

export default function useCreatePlayer(): UseMutationResult<
    CreatePlayerResponse,
    any,
    CreatePlayerRequest
> {
    return useApiMutation<CreatePlayerRequest, CreatePlayerResponse>(
        'manager/players/createPlayer'
    );
}
