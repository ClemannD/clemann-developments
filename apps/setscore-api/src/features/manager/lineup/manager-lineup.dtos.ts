import { SubReason } from '../../../entities/player.entity';

export class GetLineupRequest {
    weekId: string;
}

export class LineupPlayerDto {
    playerId: string;
    userId: string;
    firstName: string;
    lastName: string;
    subUserId: string;
    subName: string;
    subReason: string;
}

export class LineupCourtDto {
    courtId: string;
    courtNumber: number;
    courtPosition: number;
    players: LineupPlayerDto[];
}

export class LineupDto {
    weekId: string;
    weekNumber: number;
    seasonId: string;
    seasonNumber: number;
    isCurrentWeek: boolean;
    isLineupLocked: boolean;
    playingOnDate: Date;
    courts: LineupCourtDto[];
    unassignedPlayers: LineupPlayerDto[];
}

export class GetLineupResponse {
    lineup: LineupDto;
}

export class CourtUpdateDto {
    courtId: string;
    players: {
        playerId: string;
        userId: string;
    }[];
}

export class UpdateLineupRequest {
    weekId: string;
    courts: CourtUpdateDto[];
}

export class UpdatePlayerSubRequest {
    playerId: string;
    subUserId: string;
    subReason: SubReason;
}

export class SubDto {
    subUserId: string;
    subName: string;
}

export class ListSubsResponse {
    subs: SubDto[];
}
