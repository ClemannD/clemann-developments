import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { CourtDto } from '../models';

export class GetLineupRequest {
    weekNumber?: number;
    seasonNumber?: number;
}

export class WeekLineupDto {
    weekId: string;
    seasonId: string;
    isLineupLocked: boolean;
    seasonNumber: number;
    weekNumber: number;
    playingOnDate: Date;
    isCurrentWeek: boolean;
    courts: CourtDto[];
    weekCountsBySeason: { [seasonNumber: number]: number };
}

export class GetLineupResponse {
    lineup: WeekLineupDto;
}

export default function useGetLineup(): UseMutationResult<
    GetLineupResponse,
    any,
    GetLineupRequest
> {
    return useApiMutation<GetLineupRequest, GetLineupResponse>(
        'player/lineup/getLineup'
    );
}
