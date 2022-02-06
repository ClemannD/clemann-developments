import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

export class RemovePlayerRequest {
    userId: string;
}

export default function useRemovePlayer(): UseMutationResult<
    EmptyResponse,
    any,
    RemovePlayerRequest
> {
    return useApiMutation<RemovePlayerRequest, EmptyResponse>(
        'manager/players/removePlayer'
    );
}
