import {
    ListRequest,
    ListResponse,
    useApiList,
    UseApiListResults
} from '@clemann-developments/common-endpoint';
import { UserToLeague } from '../../entities/userToLeague.entity';

export class ListPlayersRequest extends ListRequest {}

export class ListPlayersResponse extends ListResponse<UserToLeague> {}

export default function useListPlayers(
    initialRequest: ListPlayersRequest
): UseApiListResults<ListPlayersRequest, ListPlayersResponse, UserToLeague> {
    return useApiList<ListPlayersRequest, ListPlayersResponse, UserToLeague>(
        initialRequest,
        'manager/players/listPlayers'
    );
}
