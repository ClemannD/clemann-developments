import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';

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
