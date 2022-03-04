import { Auth0Service } from '@clemann-developments/nest/common-auth0';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private _auth0Service: Auth0Service,

        @InjectRepository(User)
        private userRepository: Repository<User>
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

        return this.userRepository.save(newUser);
    }
}
