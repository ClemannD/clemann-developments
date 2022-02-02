export class GetCurrentCourtResponse {
    currentCourt: CurrentCourtDto;
}

export class PlayerDto {
    playerId: string;
    playerName: string;
}

export class CurrentCourtDto {
    courtId: string;
    courtNumber: number;
    players: PlayerDto[];
    currentUserPlayer: PlayerDto;
}

export class SetScoreDto {
    team1Player1Id: string;
    team1Player2Id: string;
    team2Player1Id: string;
    team2Player2Id: string;
    team1Score: number;
    team2Score: number;
    setNumber: number;
    courtId: string;
}

export class SetScoreRequest {
    setScore: SetScoreDto;
}

export class SetScoreResponse {
    repeatedSetEntry: boolean;
}
