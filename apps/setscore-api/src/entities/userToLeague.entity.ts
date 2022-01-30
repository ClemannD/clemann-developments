import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { League } from './league.entity';
import { User } from './user.entity';

export enum LeagueMemberType {
    Player = 'Player',
    Sub = 'Sub',
    Manager = 'Manager',
    Inactive = 'Inactive'
}

@Entity()
export class UserToLeague {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    leagueId: string;

    @Column({
        default: LeagueMemberType.Player
    })
    leagueMemberType: LeagueMemberType;

    @Column({
        default: false
    })
    isUserCurrentLeague: boolean;

    @Column({
        unique: true
    })
    inviteCode: string;

    @ManyToOne(() => User, (user) => user.userToLeague)
    user!: User;

    @ManyToOne(() => League, (league) => league.userToLeague)
    league!: League;
}
