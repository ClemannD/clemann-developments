import { ManagerWeekModule } from './features/manager/week/manager-week.module';
import { ManagerDashboardModule } from './features/manager/dashboard/manager-dashboard.module';
import { ManagerLineupModule } from './features/manager/lineup/manager-lineup.module';
import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { League } from './entities/league.entity';
import { User } from './entities/user.entity';
import { UserToLeague } from './entities/userToLeague.entity';
import { Season } from './entities/season.entity';
import { AuthModule } from './auth/auth.module';
import { ManagerPlayersModule } from './features/manager/players/manager-players.module';
import { AdminLeaguesModule } from './features/admin/leagues/admin-leagues.module';
import { AdminUsersModule } from './features/admin/users/admin-users.module';
import { Player } from './entities/player.entity';
import { Week } from './entities/week.entity';
import { Court } from './entities/court.entity';
import { Score } from './entities/score.entity';
import { Set } from './entities/set.entity';
import { PlayerScoreModule } from './features/player/score/player-score.module';
import { PlayerHomeModule } from './features/player/home/player-home.module';
import { PlayerLineupModule } from './features/player/lineup/player-lineup.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.local.env'
        }),
        // TypeOrmModule.forRootAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: async (configService: ConfigService) => ({
        //         type: 'mysql',
        //         host: configService.get('DATABASE_HOST'),
        //         port: configService.get<number>('DATABASE_PORT'),
        //         username: configService.get<string>('DATABASE_USERNAME'),
        //         password: configService.get<string>('DATABASE_PASSWORD'),
        //         database: configService.get<string>('DATABASE_NAME'),
        //         entities: [League, User, UserToLeague, Season],
        //         synchronize: true,
        //         retryDelay: 30000
        //     })
        // }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                url: configService.get<string>('DATABASE_URL'),
                type: 'postgres',
                entities: [
                    League,
                    User,
                    UserToLeague,
                    Season,
                    Week,
                    Player,
                    Court,
                    Score,
                    Set
                ],
                synchronize: false,
                retryDelay: 30000,
                ssl: true
            })
        }),
        AdminUsersModule,
        AdminLeaguesModule,

        ManagerPlayersModule,
        ManagerWeekModule,
        ManagerDashboardModule,
        ManagerLineupModule,

        PlayerScoreModule,
        PlayerHomeModule,
        PlayerLineupModule,

        AuthModule,
        HttpModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
