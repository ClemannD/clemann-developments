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

export enum SubReason {
    Vacation = 'Vacation',
    Injury = 'Injury',
    Other = 'Other'
}

export class PlayerDto {
    playerId?: string;
    userId?: string;
    firstName?: string;
    lastName?: string;

    subUserId?: string;
    subName?: string;
    subReason?: SubReason;

    playerPosition?: number;
    set1Score?: number;
    set2Score?: number;
    set3Score?: number;
    totalScore?: number;
    adjustedTotalScore?: number;
}

export class CourtDto {
    courtId: string;
    courtNumber: number;
    courtPosition: number;
    players: PlayerDto[];
    sets: SetDto[];
}
