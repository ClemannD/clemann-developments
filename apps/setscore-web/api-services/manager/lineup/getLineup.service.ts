import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

export class LineupPlayerDto {
    playerId: string;
    userId: string;
    firstName: string;
    lastName: string;

    subUserId: string;
    subName: string;

    playerPosition: number;
}

export class LineupCourtDto {
    courtId: string;
    courtNumber: number;
    courtPosition: number;
    players: LineupPlayerDto[];
}

export class LineupDto {
    weekId: string;
    seasonId: string;
    seasonNumber: number;
    weekNumber: number;
    playingOnDate: Date;
    isCurrentWeek: boolean;
    isLineupLocked: boolean;
    courts: LineupCourtDto[];
    unassignedPlayers: LineupPlayerDto[];
}

export class GetLineupRequest {
    weekId: string;
}

export class GetLineupResponse {
    lineup: LineupDto;
}

export default function useGetLineup(): UseMutationResult<
    GetLineupResponse,
    any,
    GetLineupRequest
> {
    return useApiMutation<GetLineupRequest, GetLineupResponse>(
        'manager/lineup/getLineup'
    );
}
