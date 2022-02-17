import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';
import { CourtDto } from '../models';

export class GetCurrentWeekRequest {}

export class GetCurrentWeekResponse {
    weekNumber: number;
    seasonNumber: number;
    playingOnDate: Date;
    court: CourtDto;
    courtCount: number;
}

export default function useGetCurrentWeek(): UseMutationResult<
    GetCurrentWeekResponse,
    any,
    GetCurrentWeekRequest
> {
    return useApiMutation<GetCurrentWeekRequest, GetCurrentWeekResponse>(
        'player/home/getCurrentWeek'
    );
}
