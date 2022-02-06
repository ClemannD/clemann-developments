import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth0Service } from '@clemann-developments/nest/common-auth0';
import { League } from '../entities/league.entity';
import { Player } from '../entities/player.entity';
import { User, UserRole, UserStatus } from '../entities/user.entity';
import { UserToLeague } from '../entities/userToLeague.entity';

@Injectable()
export class AuthService {
    constructor(
        private _auth0Service: Auth0Service,
        @InjectRepository(League)
        private leagueRepository: Repository<League>,
        @InjectRepository(UserToLeague)
        private userToLeagueRepository: Repository<UserToLeague>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Player)
        private playerRepository: Repository<Player>
    ) {}

    async getOrCreateUserFromAuthProvider(
        thirdPartyId: string,
        authorization: string
    ) {
        const user = (
            await this.userRepository.find({
                where: { thirdPartyId },
                relations: ['userToLeague', 'userToLeague.league']
            })
        )[0];

        if (user) {
            return user;
        }

        // If the user does not already exist in the database, create one.
        const authProviderUser = await this._auth0Service.getUserInfo(
            authorization
        );
        console.log('authProviderUser', authProviderUser);

        const newUser = new User();
        newUser.email = authProviderUser.email;
        newUser.firstName = authProviderUser.firstName;
        newUser.phone = authProviderUser.phone;
        newUser.lastName = authProviderUser.lastName;
        newUser.thirdPartyId = thirdPartyId;
        newUser.role = UserRole.Player;
        newUser.status = UserStatus.Registered;

        return this.userRepository.save(newUser);
    }

    async setCurrentLeague(leagueId: string, userId: string): Promise<void> {
        await this.userToLeagueRepository
            .createQueryBuilder()
            .update()
            .set({ isUserCurrentLeague: false })
            .where({ userId })
            .execute();

        await this.userToLeagueRepository
            .createQueryBuilder()
            .update()
            .set({ isUserCurrentLeague: true })
            .where({ userId, leagueId })
            .execute();
    }

    async acceptInviteCode(userId: string, inviteCode: string): Promise<void> {
        const user = await this.userRepository.findOne(userId);

        const userToLeague = await this.userToLeagueRepository.findOne({
            where: {
                inviteCode: inviteCode.toUpperCase()
            },
            relations: ['user', 'user.players', 'league']
        });

        if (
            !userToLeague ||
            user.userId === userToLeague.userId ||
            // user.email !== userToLeague.user.email ||
            userToLeague.user.status === UserStatus.Registered
        ) {
            throw new HttpException(
                'Invalid invite code.',
                HttpStatus.CONFLICT
            );
        }
        await this.userToLeagueRepository.delete(userToLeague);

        const tempUser = userToLeague.user;

        user.oldUserId = tempUser.userId;
        user.firstName = tempUser.firstName;
        user.lastName = tempUser.lastName;
        user.phone = tempUser.phone;
        user.role = tempUser.role;
        user.status = UserStatus.Registered;

        userToLeague.user = user;
        userToLeague.userId = user.userId;

        tempUser.status = UserStatus.Replaced;
        await this.userRepository.save(tempUser);

        await this.userToLeagueRepository.save(userToLeague);
        await this.userRepository.save(user);

        const allOldUserPlayers = tempUser.players;

        for (const oldUserPlayer of allOldUserPlayers) {
            oldUserPlayer.user = user;

            await this.playerRepository.save(oldUserPlayer);
        }

        // await this.userRepository.delete(tempUser.userId);
    }

    async registerUser(
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    ): Promise<void> {
        const user = await this.userRepository.findOne(userId);

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;

        await this.userRepository.save(user);
    }
}
