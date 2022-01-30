export class TeamDto {
    player1Id?: string;
    player1Name?: string;
    player2Id?: string;
    player2Name?: string;
    score?: number;
}

export class SetDto {
    setId: string;
    setNumber: number;
    team1: TeamDto;
    team2: TeamDto;
}

export class PlayerDto {
    playerId: string;
    userId: string;
    firstName: string;
    lastName: string;

    subUserId: string;
    subName: string;
    subReason: string;

    playerPosition: number;
    set1Score: number;
    set2Score: number;
    set3Score: number;
    totalScore: number;
    adjustedTotalScore: number;
}

export class CourtDto {
    courtId: string;
    courtNumber: number;
    courtPosition: number;
    players: PlayerDto[];
    sets: SetDto[];
}

export class WeekDto {
    weekId: string;
    seasonId: string;
    isLineupLocked: boolean;
    seasonNumber: number;
    weekNumber: number;
    playingOnDate: Date;
    isCurrentWeek: boolean;
    courts: CourtDto[];
}

export class GetWeekRequest {
    weekId?: string;
}

export class GetWeekResponse {
    week: WeekDto;
}

export class UpdateWeekPlayingOnDateRequest {
    weekId: string;
    playingOnDate: Date;
}

export class CreateCourtForWeekRequest {
    weekId: string;
    courtNumber: number;
    courtPosition: number;
}

export class UpdateCourtNumberRequest {
    courtId: string;
    courtNumber: number;
}

export class UpdateCourtOrderRequest {
    courtPositions: {
        courtId: string;
        courtPosition: number;
    }[];
}

export class CreateOrUpdateSetRequest {
    set: SetDto;
    courtId: string;
}

export class UpdatePlayerAdjustedTotalRequest {
    playerId: string;
    adjustedTotal: number;
}
