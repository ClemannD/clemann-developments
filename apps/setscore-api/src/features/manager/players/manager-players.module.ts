import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../auth/auth.module';
import { League } from '../../../entities/league.entity';
import { User } from '../../../entities/user.entity';
import { UserToLeague } from '../../../entities/userToLeague.entity';
import { ManagerPlayersController } from './manager-players.controller';
import { ManagerPlayersService } from './manager-players.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserToLeague, League]),
        AuthModule
    ],
    controllers: [ManagerPlayersController],
    providers: [ManagerPlayersService]
})
export class ManagerPlayersModule {}
