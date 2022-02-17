import {
    ListRequest,
    ListResponse,
    useApiList
} from '@clemann-developments/common-endpoint';

import { League } from '../../entities/league.entity';

export class ListLeaguesRequest extends ListRequest {}

export class ListLeaguesResponse extends ListResponse<League> {}

export default function useListLeagues(initialRequest: ListLeaguesRequest) {
    return useApiList<ListLeaguesRequest, ListLeaguesResponse>(
        initialRequest,
        'admin/leagues/listLeagues'
    );
}
