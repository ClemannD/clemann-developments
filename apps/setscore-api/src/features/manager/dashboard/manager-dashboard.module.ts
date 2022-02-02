import { ManagerDashboardService } from './manager-dashboard.service';
import { ManagerDashboardController } from './manager-dashboard.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from '../../../entities/league.entity';
import { AuthModule } from '../../../auth/auth.module';
import { Season } from '../../../entities/season.entity';
import { Week } from '../../../entities/week.entity';

@Module({
    imports: [TypeOrmModule.forFeature([League, Season, Week]), AuthModule],
    controllers: [ManagerDashboardController],
    providers: [ManagerDashboardService]
})
export class ManagerDashboardModule {}
