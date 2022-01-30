export class GetLineupRequest {
    weekNumber: number;
    seasonNumber: number;
}

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
