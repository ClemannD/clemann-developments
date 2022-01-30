import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';

export class StartNewSeasonRequest {
    newSeasonNumber: number;
    playingOnDate: Date;
}

export default function useStartNewSeason(): UseMutationResult<
    EmptyResponse,
    any,
    StartNewSeasonRequest
> {
    return useApiMutation<StartNewSeasonRequest, EmptyResponse>(
        'manager/dashboard/startNewSeason'
    );
}
