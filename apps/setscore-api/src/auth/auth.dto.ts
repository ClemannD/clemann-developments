import { League } from '../entities/league.entity';
import { User } from '../entities/user.entity';

export class GetCurrentUserResponse {
    user: User;
    currentLeague: League;
}

export class SetCurrentLeagueRequest {
    leagueId: string;
}

export class AcceptInviteCodeRequest {
    inviteCode: string;
}

export class RegisterUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}
