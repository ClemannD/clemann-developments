import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';

export class UpdatePlayerAdjustedTotalRequest {
    playerId: string;
    adjustedTotal: number;
}

export default function useUpdatePlayerAdjustedTotal(): UseMutationResult<
    EmptyResponse,
    any,
    UpdatePlayerAdjustedTotalRequest
> {
    return useApiMutation<UpdatePlayerAdjustedTotalRequest, EmptyResponse>(
        'manager/week/updatePlayerAdjustedTotal'
    );
}
