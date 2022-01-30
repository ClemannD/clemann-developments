import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

export class GetCurrentCourtRequest {}

export class GetCurrentCourtResponse {
    currentCourt: CurrentCourtDto;
}

export class PlayerDto {
    playerId: string;
    playerName: string;
}

export class CurrentCourtDto {
    currentUserPlayer: PlayerDto;
    courtId: string;
    courtNumber: number;
    players: PlayerDto[];
}

export default function useGetCurrentCourt(): UseMutationResult<
    GetCurrentCourtResponse,
    any,
    GetCurrentCourtRequest
> {
    return useApiMutation<GetCurrentCourtRequest, GetCurrentCourtResponse>(
        'player/score/getCurrentCourt'
    );
}
