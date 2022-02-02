export class WeekSummaryDto {
    weekId: string;
    weekNumber: number;
    playingOnDate: Date;
    isCurrentWeek: boolean;
    courtCount: number;
}

export class SeasonSummaryDto {
    seasonId: string;
    seasonNumber: number;
    seasonStartDate: Date;
    seasonEndDate: Date;
    isCurrentSeason: boolean;
    weekSummaries: WeekSummaryDto[];
}

export class GetSeasonsSummaryResponse {
    seasons: SeasonSummaryDto[];
}

export class StartNewSeasonRequest {
    newSeasonNumber: number;
    playingOnDate: Date;
}

export class AddWeekRequest {
    weekNumber: number;
    seasonId: string;
    playingOnDate: Date;
}

export class UpdateLeagueNotesRequest {
    leagueNotes: string;
}
