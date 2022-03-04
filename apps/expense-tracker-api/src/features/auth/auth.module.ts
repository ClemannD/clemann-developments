import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth0Module } from '@clemann-developments/nest/common-auth0';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUserGuard } from './auth-user.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
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
