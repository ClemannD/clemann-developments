import { Auth0Service } from '@clemann-developments/nest/common-auth0';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private _auth0Service: Auth0Service,

        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Account)
        private accountRepository: Repository<Account>
    ) {}

    public async getOrCreateUserFromAuthProvider(
        thirdPartyId: string,
        authorization: string
    ): Promise<User> {
        const user = (
            await this.userRepository.find({
                where: { thirdPartyId },
                relations: ['account']
            })
        )[0];

        if (user) {
            return user;
        }

        // If the user does not already exist in the database, create one.
        const authProviderUser = await this._auth0Service.getUserInfo(
            authorization
        );

        const newUser = new User();
        newUser.email = authProviderUser.email;
        newUser.firstName = authProviderUser.firstName;
        newUser.phone = authProviderUser.phone;
        newUser.lastName = authProviderUser.lastName;
        newUser.thirdPartyId = thirdPartyId;

        return this.userRepository.save(newUser);
    }

    public async registerUser(
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        accountName: string
    ): Promise<void> {
        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new Error('User does not exist.');
        }

        const account = new Account();
        account.accountName = accountName;
        account.user = user;

        await this.accountRepository.save(account);

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;

        this.userRepository.save(user);
    }
}
