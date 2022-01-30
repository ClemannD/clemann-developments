import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

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

export default function useSetScore(): UseMutationResult<
    SetScoreResponse,
    any,
    SetScoreRequest
> {
    return useApiMutation<SetScoreRequest, SetScoreResponse>(
        'player/score/setScore'
    );
}
