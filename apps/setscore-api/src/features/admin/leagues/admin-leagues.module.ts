import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../auth/auth.module';
import { League } from '../../../entities/league.entity';
import { User } from '../../../entities/user.entity';
import { UserToLeague } from '../../../entities/userToLeague.entity';
import { AdminLeaguesController } from './admin-leagues.controller';
import { AdminLeaguesService } from './admin-leagues.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([League, UserToLeague, User]),
        AuthModule
    ],
    controllers: [AdminLeaguesController],
    providers: [AdminLeaguesService]
})
export class AdminLeaguesModule {}
