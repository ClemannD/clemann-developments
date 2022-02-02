import { ManagerLineupService } from './manager-lineup.service';
import { ManagerLineupController } from './manager-lineup.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../auth/auth.module';
import { League } from '../../../entities/league.entity';
import { User } from '../../../entities/user.entity';
import { UserToLeague } from '../../../entities/userToLeague.entity';
import { Season } from '../../../entities/season.entity';
import { Court } from '../../../entities/court.entity';
import { Week } from '../../../entities/week.entity';
import { Player } from '../../../entities/player.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            League,
            UserToLeague,
            User,
            Season,
            Court,
            Week,
            Player
        ]),
        AuthModule
    ],
    controllers: [ManagerLineupController],
    providers: [ManagerLineupService]
})
export class ManagerLineupModule {}
