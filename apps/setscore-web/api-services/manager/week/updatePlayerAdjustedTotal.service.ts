import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';

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
