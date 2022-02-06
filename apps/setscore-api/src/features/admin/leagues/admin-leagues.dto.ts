import {
    ListRequest,
    ListResponse
} from '@clemann-developments/common-endpoint';
import { IsNotEmpty } from 'class-validator';
import { League } from '../../../entities/league.entity';
import { LeagueMemberType } from '../../../entities/userToLeague.entity';

export class ListLeaguesRequest extends ListRequest {}
export class ListLeaguesResponse extends ListResponse<League> {}

export class GetLeagueRequest {
    leagueId: string;
}

export class GetLeagueResponse {
    league: League;
}

export class CreateLeagueRequest {
    name: string;
    state: string;
    city: string;
}

export class UpdateLeagueRequest {
    leagueId: string;
    name: string;
    state: string;
    city: string;
}

export class DeleteLeagueRequest {
    leagueId: string;
}

export class UpdateLeagueMemberTypeRequest {
    userId: string;
    leagueId: string;
    leagueMemberType: LeagueMemberType;
}

export class AddUserToLeagueRequest {
    userId: string;
    leagueId: string;
    leagueMemberType: LeagueMemberType;
}

export class RemoveUserFromLeagueRequest {
    userId: string;
    leagueId: string;
}

export class CreateUserForLeagueRequest {
    @IsNotEmpty()
    leagueId: string;

    email: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    phone: string;

    leagueMemberType: LeagueMemberType;
}
