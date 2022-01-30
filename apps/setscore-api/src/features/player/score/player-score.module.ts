import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../auth/auth.module';
import { Court } from '../../../entities/court.entity';
import { League } from '../../../entities/league.entity';
import { UserToLeague } from '../../../entities/userToLeague.entity';
import { Week } from '../../../entities/week.entity';
import { PlayerScoreController } from './player-score.controller';
import { PlayerScoreService } from './player-score.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Week, UserToLeague, League, Court]),
        AuthModule
    ],
    controllers: [PlayerScoreController],
    providers: [PlayerScoreService]
})
export class PlayerScoreModule {}
