import { PaginationAndSort } from '@clemann-developments/common-endpoint';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findPaginatedAndSort } from '@clemann-developments/node/typeorm/find-paginated-and-sort';
import { Repository } from 'typeorm';
import {
    LeagueNotFoundException,
    UserNotFoundException
} from '../../../app.exceptions';
import { League } from '../../../entities/league.entity';
import { User } from '../../../entities/user.entity';
import {
    LeagueMemberType,
    UserToLeague
} from '../../../entities/userToLeague.entity';

@Injectable()
export class AdminLeaguesService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(League)
        private leagueRepository: Repository<League>,
        @InjectRepository(UserToLeague)
        private userToLeagueRepository: Repository<UserToLeague>
    ) {}

    public async listLeagues(
        paginationAndSort: PaginationAndSort,
        filters: any
    ): Promise<[League[], number]> {
        return await findPaginatedAndSort(
            this.leagueRepository,
            paginationAndSort,
            filters,
            'name',
            ['userToLeague']
        );
    }

    public async getLeague(leagueId: string): Promise<League> {
        return this.leagueRepository.findOne(leagueId, {
            relations: ['userToLeague', 'userToLeague.user']
        });
    }

    public async findMembers(leagueId: string): Promise<UserToLeague[]> {
        const league = await this.leagueRepository.findOne(leagueId, {
            relations: ['userToLeague']
        });

        if (!league) {
            throw new LeagueNotFoundException(leagueId);
        }

        return league.userToLeague;
    }

    public async createLeague(
        name: string,
        state: string,
        city: string
    ): Promise<void> {
        const league = new League();
        league.name = name;
        league.state = state;
        league.city = city;

        await this.leagueRepository.save(league);
    }

    public async updateLeague(
        leagueId: string,
        name: string,
        state: string,
        city: string
    ): Promise<void> {
        await this.leagueRepository.save({
            leagueId,
            name,
            state,
            city
        });
    }

    public async deleteLeague(leagueId: string): Promise<void> {
        await this.leagueRepository.delete(leagueId);
    }

    public async addUserToLeague(
        userId: string,
        leagueId: string,
        leagueMemberType: LeagueMemberType
    ): Promise<void> {
        const league = await this.leagueRepository.findOne(leagueId, {
            relations: ['userToLeague']
        });

        if (!league) {
            throw new LeagueNotFoundException(leagueId);
        }

        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new UserNotFoundException('userId', userId);
        }

        const userToLeague = new UserToLeague();
        userToLeague.userId = userId;
        userToLeague.user = user;
        userToLeague.leagueId = league.leagueId;
        userToLeague.league = league;
        userToLeague.leagueMemberType = leagueMemberType;
        userToLeague.inviteCode = this._generateInviteCode();

        league.userToLeague.push(userToLeague);

        await this.leagueRepository.save(league);
    }

    public async removeUserFromLeague(
        userId: string,
        leagueId: string
    ): Promise<void> {
        const league = await this.leagueRepository.findOne(leagueId, {
            relations: ['userToLeague']
        });

        if (!league) {
            throw new LeagueNotFoundException(leagueId);
        }

        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new UserNotFoundException('userId', userId);
        }

        const userToLeagueToRemove = league.userToLeague.find(
            (user) => user.userId === userId
        );

        try {
            await this.userToLeagueRepository.remove(userToLeagueToRemove);
        } catch (error) {
            console.log(error);
        }
    }

    async createUserForLeague(
        leagueId: string,
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        leagueMemberType: LeagueMemberType
    ): Promise<void> {
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.phone = phone;
        user.email = email;

        const createdUser = await this.userRepository.save(user);

        const league = await this.getLeague(leagueId);

        const userToLeague = new UserToLeague();
        userToLeague.userId = createdUser.userId;
        userToLeague.leagueId = leagueId;
        userToLeague.league = league;
        userToLeague.leagueMemberType = leagueMemberType;
        userToLeague.inviteCode = this._generateInviteCode();

        createdUser.userToLeague = [userToLeague];

        await this.userRepository.save(createdUser);
    }

    private _generateInviteCode(): string {
        return Math.round(Math.pow(36, 7) - Math.random() * Math.pow(36, 6))
            .toString(36)
            .slice(1)
            .toUpperCase();
    }
}
