import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from '../../../entities/league.entity';
import { Player } from '../../../entities/player.entity';
import {
    CourtDto,
    GetCurrentWeekResponse,
    PlayerDto
} from './player-home.dtos';

@Injectable()
export class PlayerHomeService {
    constructor(
        @InjectRepository(League)
        private leagueRepository: Repository<League>
    ) {}

    public async getCurrentWeek(
        leagueId: string,
        userId: string
    ): Promise<GetCurrentWeekResponse> {
        const league = await this.leagueRepository.findOne({
            where: { leagueId },
            relations: [
                'seasons',
                'seasons.weeks',
                'seasons.weeks.courts',
                'seasons.weeks.courts.sets',
                'seasons.weeks.courts.sets.team1Player1',
                'seasons.weeks.courts.sets.team1Player2',
                'seasons.weeks.courts.sets.team2Player1',
                'seasons.weeks.courts.sets.team2Player2',
                'seasons.weeks.courts.players',
                'seasons.weeks.courts.players.user'
            ]
        });

        // Get the court the player is on this week.
        let player: Player;

        const currentSeason = league.seasons.find(
            (season) => season.isCurrentSeason
        );

        if (!currentSeason) {
            return null;
        }

        const currentWeek = currentSeason.weeks.find(
            (week) => week.isCurrentWeek
        );

        if (!currentWeek) {
            return null;
        }

        const court = currentWeek.courts.find((court) => {
            const foundPlayer = court.players.find(
                (player) => player.user.userId === userId
            );
            player = foundPlayer;
            return foundPlayer;
        });

        if (!court) {
            return null;
        }

        const courtDto = new CourtDto();
        if (court) {
            courtDto.courtId = court.courtId;
            courtDto.courtNumber = court.courtNumber;
            courtDto.courtPosition = court.courtPosition;

            const orderedPlayers = court.players.sort(
                (a, b) => a.playerPosition - b.playerPosition
            );

            const set1 = court.sets.find((set) => set.setNumber === 1);
            const set2 = court.sets.find((set) => set.setNumber === 2);
            const set3 = court.sets.find((set) => set.setNumber === 3);

            courtDto.players = orderedPlayers.map((player) => {
                const playerDto = new PlayerDto();
                playerDto.playerId = player?.playerId;
                playerDto.userId = player?.user?.userId;
                playerDto.firstName = player?.user.firstName;
                playerDto.lastName = player?.user.lastName;

                playerDto.subUserId = player?.sub?.user.userId;
                playerDto.subReason = player?.subReason;
                playerDto.subName = player?.sub
                    ? player?.sub?.user.firstName +
                      ' ' +
                      player?.sub?.user.lastName
                    : null;

                if (!!set1) {
                    playerDto.set1Score =
                        set1?.team1Player1?.playerId === player.playerId ||
                        set1?.team1Player2?.playerId === player.playerId
                            ? set1?.team1Score
                            : set1?.team2Score || 0;
                }
                if (!!set2) {
                    playerDto.set2Score =
                        set2?.team1Player1?.playerId === player.playerId ||
                        set2?.team1Player2?.playerId === player.playerId
                            ? set2?.team1Score
                            : set2?.team2Score || 0;
                }
                if (!!set3) {
                    playerDto.set3Score =
                        set3?.team1Player1?.playerId === player.playerId ||
                        set3?.team1Player2?.playerId === player.playerId
                            ? set3?.team1Score
                            : set3?.team2Score || 0;
                }

                playerDto.totalScore =
                    (playerDto.set1Score || 0) +
                    (playerDto.set2Score || 0) +
                    (playerDto.set3Score || 0);

                playerDto.adjustedTotalScore = player?.adjustedTotalScore;
                return playerDto;
            });
        }

        const getCurrentWeekResponse = new GetCurrentWeekResponse();
        getCurrentWeekResponse.court = court ? courtDto : null;
        getCurrentWeekResponse.playingOnDate = currentWeek.playingOnDate;
        getCurrentWeekResponse.weekNumber = currentWeek.weekNumber;
        getCurrentWeekResponse.seasonNumber = currentSeason.seasonNumber;
        getCurrentWeekResponse.courtCount = currentWeek.courts.length;

        return getCurrentWeekResponse;
    }
}
