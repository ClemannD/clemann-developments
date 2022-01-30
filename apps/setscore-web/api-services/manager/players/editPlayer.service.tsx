import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { User } from '../../entities/user.entity';
import { LeagueMemberType } from '../../entities/userToLeague.entity';

export class EditPlayerRequest {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    leagueMemberType: LeagueMemberType;
}

export class EditPlayerResponse {
    user: User;
}

export default function useEditPlayer(): UseMutationResult<
    EditPlayerResponse,
    any,
    EditPlayerRequest
> {
    return useApiMutation<EditPlayerRequest, EditPlayerResponse>(
        'manager/players/editPlayer'
    );
}
