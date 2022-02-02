import {
    BadRequestException,
    ForbiddenException,
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Court } from '../../../entities/court.entity';
import { League } from '../../../entities/league.entity';
import { Player } from '../../../entities/player.entity';
import { Set } from '../../../entities/set.entity';

import { CurrentCourtDto, SetScoreDto } from './player-score.dtos';

@Injectable()
export class PlayerScoreService {
    constructor(
        @InjectRepository(Court)
        private courtRepository: Repository<Court>,
        @InjectRepository(League)
        private leagueRepository: Repository<League>
    ) {}

    public async setScore(
        leagueId: string,
        userId: string,
        setScoreDto: SetScoreDto
    ): Promise<boolean> {
        const court = await this.courtRepository.findOne(setScoreDto.courtId, {
            relations: [
                'players',
                'players.user',
                'sets',
                'week',
                'week.season',
                'week.season.league'
            ]
        });

        if (court.week.season.league.leagueId !== leagueId) {
            throw new ForbiddenException('User not member of league');
        }

        const currentUserPlayer = court.players.find(
            (player) => player.user.userId === userId
        );

        if (!currentUserPlayer) {
            throw new ForbiddenException('User not assigned to court');
        }

        const existingSet = court.sets.find(
            (set) => set.setNumber === setScoreDto.setNumber
        );

        if (existingSet) {
            return true;
        }

        const team1Player1 = court.players.find(
            (player) => player.playerId === setScoreDto.team1Player1Id
        );
        const team1Player2 = court.players.find(
            (player) => player.playerId === setScoreDto.team1Player2Id
        );
        const team2Player1 = court.players.find(
            (player) => player.playerId === setScoreDto.team2Player1Id
        );
        const team2Player2 = court.players.find(
            (player) => player.playerId === setScoreDto.team2Player2Id
        );

        if (!team1Player1 || !team1Player2 || !team2Player1 || !team2Player2) {
            throw new BadRequestException(
                'Not all players assigned to court: ' + court.courtId
            );
        }

        const set = new Set();
        set.setNumber = setScoreDto.setNumber;
        set.team1Player1 = team1Player1;
        set.team1Player2 = team1Player2;
        set.team2Player1 = team2Player1;
        set.team2Player2 = team2Player2;
        set.team1Score = setScoreDto.team1Score;
        set.team2Score = setScoreDto.team2Score;

        court.sets.push(set);
        await this.courtRepository.save(court);
    }

    public async getCurrentCourt(
        userId: string,
        leagueId: string
    ): Promise<CurrentCourtDto> {
        const league = await this.leagueRepository.findOne({
            where: { leagueId },
            relations: [
                'seasons',
                'seasons.weeks',
                'seasons.weeks.courts',
                'seasons.weeks.courts.players',
                'seasons.weeks.courts.players.user'
            ]
        });

        let player: Player;
        const court = league.seasons
            .find((season) => season.isCurrentSeason)
            ?.weeks.find((week) => week.isCurrentWeek)
            ?.courts.find((court) => {
                const foundPlayer = court.players.find(
                    (player) => player.user.userId === userId
                );
                player = foundPlayer;
                return !!foundPlayer;
            });

        if (!court) {
            return null;
        }

        const currentCourtDto = new CurrentCourtDto();
        currentCourtDto.currentUserPlayer = {
            playerId: player.playerId,
            playerName: player.user.firstName + ' ' + player.user.lastName
        };
        currentCourtDto.courtId = court.courtId;
        currentCourtDto.courtNumber = court.courtNumber;
        currentCourtDto.players = court.players
            .map((player) => ({
                playerId: player.playerId,
                playerName: player.user.firstName + ' ' + player.user.lastName
            }))
            .filter(
                (player) =>
                    player.playerId !==
                    currentCourtDto.currentUserPlayer.playerId
            );

        return currentCourtDto;
    }
}
