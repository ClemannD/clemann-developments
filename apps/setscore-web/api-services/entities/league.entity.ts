import { UserToLeague } from './userToLeague.entity';

export class League {
    leagueId?: string;
    name?: string;
    state?: string;
    city?: string;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userToLeague?: UserToLeague[];
}
