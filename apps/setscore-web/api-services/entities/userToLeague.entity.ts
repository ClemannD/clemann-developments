import { League } from './league.entity';
import { User } from './user.entity';

export enum LeagueMemberType {
    Player = 'Player',
    Sub = 'Sub',
    Manager = 'Manager',
    Inactive = 'Inactive'
}

export class UserToLeague {
    userId?: string;
    leagueId?: string;
    inviteCode?: string;
    leagueMemberType?: LeagueMemberType;
    isUserCurrentLeague?: boolean;
    user?: User;
    league?: League;
}
