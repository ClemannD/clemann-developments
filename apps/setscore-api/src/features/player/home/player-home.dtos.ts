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
}

export class GetCurrentWeekResponse {
    weekNumber?: number;
    seasonNumber?: number;
    playingOnDate?: Date;
    court?: CourtDto;
    courtCount?: number;
}
