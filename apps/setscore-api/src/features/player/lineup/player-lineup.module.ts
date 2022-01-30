import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../auth/auth.module';
import { Court } from '../../../entities/court.entity';
import { League } from '../../../entities/league.entity';
import { Season } from '../../../entities/season.entity';
import { UserToLeague } from '../../../entities/userToLeague.entity';
import { Week } from '../../../entities/week.entity';
import { PlayerLineupController } from './player-lineup.controller';
import { PlayerLineupService } from './player-lineup.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Week, UserToLeague, League, Court, Season]),
        AuthModule
    ],
    controllers: [PlayerLineupController],
    providers: [PlayerLineupService]
})
export class PlayerLineupModule {}
