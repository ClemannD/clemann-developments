import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth0Module } from '@clemann-developments/nest/common-auth0';
import { League } from '../entities/league.entity';
import { Player } from '../entities/player.entity';
import { User } from '../entities/user.entity';
import { UserToLeague } from '../entities/userToLeague.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUserGuard } from './auth-user.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserToLeague, User, League, Player]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        HttpModule,
        Auth0Module.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    auth0IssuerUrl: configService.get<string>(
                        'SET_SCORE_AUTH0_ISSUER_URL'
                    ),
                    auth0Audience: configService.get<string>(
                        'SET_SCORE_AUTH0_AUDIENCE'
                    )
                };
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthUserGuard, AuthService],
    exports: [PassportModule, AuthUserGuard, AuthService]
})
export class AuthModule {}
