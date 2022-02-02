import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../auth/auth.module';
import { Court } from '../../../entities/court.entity';
import { League } from '../../../entities/league.entity';
import { Player } from '../../../entities/player.entity';
import { Set } from '../../../entities/set.entity';
import { Week } from '../../../entities/week.entity';
import { ManagerWeekController } from './manager-week.controller';
import { ManagerWeekService } from './manager-week.service';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([League, Player, Week, Court, Set])
    ],
    controllers: [ManagerWeekController],
    providers: [ManagerWeekService]
})
export class ManagerWeekModule {}
