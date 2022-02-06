import {
    PaginationAndSort,
    SortDirection,
    TakeAll
} from '@clemann-developments/common-endpoint';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { League } from '../../../entities/league.entity';
import { User, UserRole, UserStatus } from '../../../entities/user.entity';
import {
    LeagueMemberType,
    UserToLeague
} from '../../../entities/userToLeague.entity';

@Injectable()
export class ManagerPlayersService {
    constructor(
        @InjectRepository(UserToLeague)
        private userToLeagueRepository: Repository<UserToLeague>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(League)
        private leagueRepository: Repository<League>
    ) {}

    public async listPlayers(
        leagueId: string,
        paginationAndSort: PaginationAndSort,
        filters: any
    ): Promise<[UserToLeague[], number]> {
        let whereConditions;

        const leagueMemberType = [];
        const statusOptions = [];

        if (filters) {
            if (filters.showSubs) {
                leagueMemberType.push(LeagueMemberType.Sub);
            }
            if (filters.showManagers) {
                leagueMemberType.push(LeagueMemberType.Manager);
            }
            if (filters.showPlayers) {
                leagueMemberType.push(LeagueMemberType.Player);
            }
            if (filters.showInactive) {
                leagueMemberType.push(LeagueMemberType.Inactive);
            }

            if (filters.showRegistered) {
                statusOptions.push(UserStatus.Registered);
            }
            if (filters.showPlaceholders) {
                statusOptions.push(UserStatus.Placeholder);
            }
            if (filters.showReplaced) {
                statusOptions.push(UserStatus.Replaced);
            }

            whereConditions = {
                leagueMemberType: In(leagueMemberType)
            };
        }

        let allLeagueUsers = await this.userToLeagueRepository.find({
            where: {
                leagueId,
                ...whereConditions
            },
            relations: ['user']
        });

        allLeagueUsers = allLeagueUsers.filter((userToLeague) => {
            return statusOptions.includes(userToLeague.user.status);
        });

        if (paginationAndSort?.sortColumn) {
            allLeagueUsers.sort((a, b) => {
                if (paginationAndSort.sortColumn === 'firstName') {
                    return a.user.firstName < b.user.firstName ? 1 : -1;
                } else {
                    return a[paginationAndSort.sortColumn] <
                        b[paginationAndSort.sortColumn]
                        ? 1
                        : -1;
                }
            });
        }

        if (paginationAndSort?.sortDirection == SortDirection.Asc) {
            allLeagueUsers.reverse();
        }

        const paginatedAndSortedLeagueUsers = allLeagueUsers.slice(
            paginationAndSort?.skip || 0,
            paginationAndSort?.take
                ? paginationAndSort?.skip + paginationAndSort?.take
                : TakeAll
        );

        return [
            paginatedAndSortedLeagueUsers,
            paginatedAndSortedLeagueUsers.length
        ];
    }

    public async createPlayer(
        leagueId: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        leagueMemberType: LeagueMemberType
    ): Promise<void> {
        const league = await this.leagueRepository.findOne(leagueId, {
            relations: ['userToLeague']
        });

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        user.role =
            leagueMemberType === LeagueMemberType.Manager
                ? UserRole.Manager
                : UserRole.Player;

        const createdUser = await this.userRepository.save(user);

        const userToLeague = new UserToLeague();
        userToLeague.user = createdUser;
        userToLeague.userId = createdUser.userId;
        userToLeague.leagueId = leagueId;
        userToLeague.league = league;
        userToLeague.leagueMemberType = leagueMemberType;
        userToLeague.inviteCode = this._generateInviteCode();

        league.userToLeague.push(userToLeague);

        await this.leagueRepository.save(league);
    }

    async editPlayer(
        leagueId: string,
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        leagueMemberType: LeagueMemberType
    ): Promise<void> {
        const user = await this.userRepository.findOne(userId, {
            relations: ['userToLeague']
        });

        const userToLeagueToUpdate = user.userToLeague.find(
            (userToLeague) => userToLeague.leagueId === leagueId
        );
        userToLeagueToUpdate.leagueMemberType = leagueMemberType;

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;

        await this.userRepository.save(user);
    }

    async removePlayer(leagueId: string, userId: string): Promise<void> {
        await this.userToLeagueRepository.delete({ userId, leagueId });
    }

    private _generateInviteCode(): string {
        return Math.round(Math.pow(36, 7) - Math.random() * Math.pow(36, 6))
            .toString(36)
            .slice(1)
            .toUpperCase();
    }
}
