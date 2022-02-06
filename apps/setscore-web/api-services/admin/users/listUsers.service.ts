import {
    ListRequest,
    ListResponse
} from '@clemann-developments/common-endpoint';
import useApiList from '../../../hooks/useApiList';
import { User } from '../../entities/user.entity';

export class ListUsersRequest extends ListRequest {}

export class ListUsersResponse extends ListResponse<User> {}

export default function useListUsers(initialRequest: ListUsersRequest) {
    return useApiList<ListUsersRequest, ListUsersResponse>(
        initialRequest,
        'admin/users/listUsers'
    );
}
