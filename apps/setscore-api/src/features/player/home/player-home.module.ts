import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../auth/auth.module';
import { Court } from '../../../entities/court.entity';
import { League } from '../../../entities/league.entity';
import { UserToLeague } from '../../../entities/userToLeague.entity';
import { Week } from '../../../entities/week.entity';
import { PlayerHomeController } from './player-home.controller';
import { PlayerHomeService } from './player-home.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Week, UserToLeague, League, Court]),
        AuthModule
    ],
    controllers: [PlayerHomeController],
    providers: [PlayerHomeService]
})
export class PlayerHomeModule {}
