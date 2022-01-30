import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';

export class UpdatePlayerSubRequest {
    playerId: string;
    subUserId: string;
}

export default function useUpdatePlayerSub(): UseMutationResult<
    EmptyResponse,
    any,
    UpdatePlayerSubRequest
> {
    return useApiMutation<UpdatePlayerSubRequest, EmptyResponse>(
        'manager/lineup/updatePlayerSub'
    );
}
