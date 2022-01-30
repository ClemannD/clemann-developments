import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from '../../../entities/league.entity';
import { Season } from '../../../entities/season.entity';
import { Week } from '../../../entities/week.entity';
import {
    CourtDto,
    PlayerDto,
    SetDto,
    TeamDto,
    WeekLineupDto
} from './player-lineup.dtos';

@Injectable()
export class PlayerLineupService {
    constructor(
        @InjectRepository(Week)
        private weekRepository: Repository<Week>,
        @InjectRepository(League)
        private leagueRepository: Repository<League>,
        @InjectRepository(Season)
        private seasonRepository: Repository<Season>
    ) {}

    private async _getCurrentWeekForLeague(leagueId: string): Promise<Week> {
        return (
            await this.leagueRepository.findOne(leagueId, {
                relations: [
                    'seasons',
                    'seasons.weeks',
                    'seasons.weeks.season',
                    'seasons.weeks.season.league',
                    'seasons.weeks.courts',
                    'seasons.weeks.courts.players',
                    'seasons.weeks.courts.players.user',
                    'seasons.weeks.courts.players.sub',
                    'seasons.weeks.courts.players.sub.user',
                    'seasons.weeks.courts.sets',
                    'seasons.weeks.courts.sets.team1Player1',
                    'seasons.weeks.courts.sets.team1Player2',
                    'seasons.weeks.courts.sets.team2Player1',
                    'seasons.weeks.courts.sets.team2Player2'
                ]
            })
        ).seasons
            .find((s) => s.isCurrentSeason)
            ?.weeks.find((w) => w.isCurrentWeek);
    }

    public async getWeek(
        leagueId: string,
        seasonNumber?: number,
        weekNumber?: number
    ): Promise<WeekLineupDto> {
        let week: Week;

        if (!!weekNumber && !!seasonNumber) {
            const league = await this.leagueRepository.findOne({
                where: { leagueId },
                relations: [
                    'seasons',
                    'seasons.weeks',
                    'seasons.weeks.season',
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

            week = league.seasons
                .find((season) => season.seasonNumber === seasonNumber)
                .weeks.find((week) => week.weekNumber === weekNumber);

            if (!week) {
                week = await this._getCurrentWeekForLeague(leagueId);
            }

            // if (week.season.league.leagueId !== leagueId) {
            //     throw new ForbiddenException(
            //         'Season does not belong to league'
            //     );
            // }
        } else {
            week = await this._getCurrentWeekForLeague(leagueId);
        }

        const weekDto = new WeekLineupDto();
        weekDto.weekId = week.weekId;
        weekDto.weekNumber = week.weekNumber;
        weekDto.seasonId = week.season.seasonId;
        weekDto.seasonNumber = week.season.seasonNumber;
        weekDto.playingOnDate = week.playingOnDate;
        weekDto.isCurrentWeek = week.isCurrentWeek;

        weekDto.weekCountsBySeason = await this._getWeekCountsBySeason(
            leagueId
        );

        const orderedCourts = week.courts.sort(
            (a, b) => a.courtPosition - b.courtPosition
        );

        weekDto.courts = orderedCourts.map((court) => {
            const courtDto = new CourtDto();
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

            courtDto.sets = court.sets.map((set) => {
                const setDto = new SetDto();
                setDto.setId = set.setId;
                setDto.setNumber = set.setNumber;

                setDto.team1 = new TeamDto();
                setDto.team1.score = set.team1Score;

                const team1Player1 = courtDto.players.find(
                    (p) => p.playerId === set.team1Player1.playerId
                );
                setDto.team1.player1Id = team1Player1.playerId;
                setDto.team1.player1Name =
                    team1Player1.firstName + ' ' + team1Player1.lastName;

                const team1Player2 = courtDto.players.find(
                    (p) => p.playerId === set.team1Player2.playerId
                );
                setDto.team1.player2Id = team1Player2.playerId;
                setDto.team1.player2Name =
                    team1Player2.firstName + ' ' + team1Player2.lastName;

                setDto.team2 = new TeamDto();
                setDto.team2.score = set.team2Score;

                const team2Player1 = courtDto.players.find(
                    (p) => p.playerId === set.team2Player1.playerId
                );
                setDto.team2.player1Id = team2Player1.playerId;
                setDto.team2.player1Name =
                    team2Player1.firstName + ' ' + team2Player1.lastName;

                const team2Player2 = courtDto.players.find(
                    (p) => p.playerId === set.team2Player2.playerId
                );
                setDto.team2.player2Id = team2Player2.playerId;
                setDto.team2.player2Name =
                    team2Player2.firstName + ' ' + team2Player2.lastName;

                return setDto;
            });

            return courtDto;
        });

        weekDto.isLineupLocked = await this.isLineupLocked(week.weekId);
        return weekDto;
    }

    public async isLineupLocked(weekId: string): Promise<boolean> {
        const week = await this.weekRepository.findOne(weekId, {
            relations: ['courts', 'courts.sets']
        });

        const isLineupLocked = week.courts.some((court) => {
            return court.sets.length > 0;
        });
        return isLineupLocked;
    }

    private async _getMaxWeekNumber(seasonId: string): Promise<number> {
        const season = await this.seasonRepository.findOne(seasonId, {
            relations: ['weeks']
        });

        const maxWeekNumber = season.weeks.reduce((max, week) => {
            return Math.max(max, week.weekNumber);
        }, 0);

        return maxWeekNumber;
    }

    private async _getMaxSeasonNumber(leagueId: string): Promise<number> {
        const league = await this.leagueRepository.findOne(leagueId, {
            relations: ['seasons']
        });

        const maxSeasonNumber = league.seasons.reduce((max, season) => {
            return Math.max(max, season.seasonNumber);
        }, 0);

        return maxSeasonNumber;
    }

    private async _getMinSeasonNumber(leagueId: string): Promise<number> {
        const league = await this.leagueRepository.findOne(leagueId, {
            relations: ['seasons']
        });

        const minSeasonNumber = league.seasons.reduce((min, season) => {
            return Math.min(min, season.seasonNumber);
        }, Number.MAX_SAFE_INTEGER);

        return minSeasonNumber;
    }

    private async _getWeekCountsBySeason(
        leagueId: string
    ): Promise<{ [seasonNumber: number]: number }> {
        const league = await this.leagueRepository.findOne(leagueId, {
            relations: ['seasons', 'seasons.weeks']
        });

        const orderedSeasons = league.seasons.sort((a, b) => {
            return a.seasonNumber - b.seasonNumber;
        });

        const weekCountsBySeason = {};

        orderedSeasons.forEach((season) => {
            const seasonNumber = season.seasonNumber;
            const weekCount = season.weeks.length;
            weekCountsBySeason[seasonNumber] = weekCount;
        });

        return weekCountsBySeason;
    }
}
