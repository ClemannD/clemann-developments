import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { League } from '../../entities/league.entity';

export class UpdateLeagueRequest {
    leagueId: string;
    name: string;
    state: string;
    city: string;
}

export class UpdateLeagueResponse {
    league: League;
}

export default function useUpdateLeague(): UseMutationResult<
    UpdateLeagueResponse,
    any,
    UpdateLeagueRequest
> {
    return useApiMutation<UpdateLeagueRequest, UpdateLeagueResponse>(
        'admin/leagues/updateLeague'
    );
}
