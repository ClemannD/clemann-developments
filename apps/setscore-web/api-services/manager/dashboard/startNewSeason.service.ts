import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

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
