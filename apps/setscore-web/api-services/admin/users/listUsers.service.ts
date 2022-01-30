import useApiList from '../../../hooks/useApiList';
import { ListRequest } from '../../common/list-request';
import { ListResponse } from '../../common/list-response';
import { User } from '../../entities/user.entity';

export class ListUsersRequest extends ListRequest {}

export class ListUsersResponse extends ListResponse<User> {}

export default function useListUsers(initialRequest: ListUsersRequest) {
    return useApiList<ListUsersRequest, ListUsersResponse>(
        initialRequest,
        'admin/users/listUsers'
    );
}
