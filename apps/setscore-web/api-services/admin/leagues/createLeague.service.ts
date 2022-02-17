import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';
import { League } from '../../entities/league.entity';

export class CreateLeagueRequest {
    name: string;
    state: string;
    city: string;
}

export class CreateLeagueResponse {
    league: League;
}

export default function useCreateLeague(): UseMutationResult<
    CreateLeagueResponse,
    any,
    CreateLeagueRequest
> {
    return useApiMutation<CreateLeagueRequest, CreateLeagueResponse>(
        'admin/leagues/createLeague'
    );
}
