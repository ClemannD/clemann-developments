import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';
import { League } from '../../entities/league.entity';

export class GetLeagueRequest {
    leagueId: string;
}

export class GetLeagueResponse {
    league: League;
}

export default function useGetLeague(): UseMutationResult<
    GetLeagueResponse,
    any,
    GetLeagueRequest
> {
    return useApiMutation<GetLeagueRequest, GetLeagueResponse>(
        'admin/leagues/getLeague'
    );
}
