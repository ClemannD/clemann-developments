import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';

export class GetSeasonsSummaryRequest {}

export class WeekSummaryDto {
    weekId: string;
    weekNumber: number;
    playingOnDate: Date;
    isCurrentWeek: boolean;
    courtCount: number;
}

export class SeasonSummaryDto {
    seasonId?: string;
    seasonNumber?: number;
    seasonStartDate?: Date;
    seasonEndDate?: Date;
    weekSummaries?: WeekSummaryDto[];
    isCurrentSeason?: boolean;
}

export class GetSeasonsSummaryResponse {
    seasons: SeasonSummaryDto[];
}

export default function useGetSeasonsSummary(): UseMutationResult<
    GetSeasonsSummaryResponse,
    any,
    GetSeasonsSummaryRequest
> {
    return useApiMutation<GetSeasonsSummaryRequest, GetSeasonsSummaryResponse>(
        'manager/dashboard/getSeasonsSummary'
    );
}
