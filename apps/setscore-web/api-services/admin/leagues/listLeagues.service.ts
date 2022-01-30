import useApiList from '../../../hooks/useApiList';
import { ListRequest } from '../../common/list-request';
import { ListResponse } from '../../common/list-response';
import { League } from '../../entities/league.entity';

export class ListLeaguesRequest extends ListRequest {}

export class ListLeaguesResponse extends ListResponse<League> {}

export default function useListLeagues(initialRequest: ListLeaguesRequest) {
    return useApiList<ListLeaguesRequest, ListLeaguesResponse>(
        initialRequest,
        'admin/leagues/listLeagues'
    );
}
