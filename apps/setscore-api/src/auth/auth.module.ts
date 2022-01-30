import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from '../entities/league.entity';
import { Player } from '../entities/player.entity';
import { User } from '../entities/user.entity';
import { UserToLeague } from '../entities/userToLeague.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth0UserGuard } from './auth0.guard';
import { Auth0Service } from './auth0.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserToLeague, User, League, Player]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        HttpModule
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, Auth0Service, Auth0UserGuard, AuthService],
    exports: [PassportModule, Auth0Service, Auth0UserGuard, AuthService]
})
export class AuthModule {}
