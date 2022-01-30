import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';

export class CourtUpdateDto {
    courtId: string;
    players: {
        playerId: string;
        userId: string;
    }[];
}

export class UpdateLineupRequest {
    courts: CourtUpdateDto[];
    weekId: string;
}

export default function useUpdateLineup(): UseMutationResult<
    EmptyResponse,
    any,
    UpdateLineupRequest
> {
    return useApiMutation<UpdateLineupRequest, EmptyResponse>(
        'manager/lineup/updateLineup'
    );
}
