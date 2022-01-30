import { ListRequest } from '../../../common/list-request';
import { ListResponse } from '../../../common/list-response';
import {
    LeagueMemberType,
    UserToLeague
} from '../../../entities/userToLeague.entity';

export class ListPlayersRequest extends ListRequest {}

export class ListPlayersResponse extends ListResponse<UserToLeague> {}

export class CreatePlayerRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    leagueMemberType: LeagueMemberType;
}

export class EditPlayerRequest {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    leagueMemberType: LeagueMemberType;
}

export class RemovePlayerRequest {
    userId: string;
}
