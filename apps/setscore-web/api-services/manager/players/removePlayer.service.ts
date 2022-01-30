import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

export class RemovePlayerRequest {
    userId: string;
}

export class RemovePlayerResponse {}

export default function useRemovePlayer(): UseMutationResult<
    RemovePlayerResponse,
    any,
    RemovePlayerRequest
> {
    return useApiMutation<RemovePlayerRequest, RemovePlayerResponse>(
        'manager/players/removePlayer'
    );
}
