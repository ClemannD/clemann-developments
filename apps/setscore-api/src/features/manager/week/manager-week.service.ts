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
import { Week } from '../../../entities/week.entity';
import {
    CourtDto,
    PlayerDto,
    SetDto,
    TeamDto,
    WeekDto
} from './manager-week.dtos';

@Injectable()
export class ManagerWeekService {
    constructor(
        @InjectRepository(League)
        private leagueRepository: Repository<League>,
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
        @InjectRepository(Set)
        private setRepository: Repository<Set>,
        @InjectRepository(Week)
        private weekRepository: Repository<Week>,
        @InjectRepository(Court)
        private courtRepository: Repository<Court>
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

    public async getWeek(leagueId: string, weekId?: string): Promise<WeekDto> {
        let week: Week;

        if (weekId) {
            week = await this.weekRepository.findOne(weekId, {
                relations: [
                    'season',
                    'season.league',
                    'courts',
                    'courts.players',
                    'courts.players.user',
                    'courts.players.sub',
                    'courts.players.sub.user',
                    'courts.sets',
                    'courts.sets.team1Player1',
                    'courts.sets.team1Player2',
                    'courts.sets.team2Player1',
                    'courts.sets.team2Player2'
                ]
            });

            if (!week) {
                week = await this._getCurrentWeekForLeague(leagueId);
            }

            if (week.season.league.leagueId !== leagueId) {
                throw new ForbiddenException(
                    'Season does not belong to league'
                );
            }
        } else {
            week = await this._getCurrentWeekForLeague(leagueId);
        }

        const weekDto = new WeekDto();
        weekDto.weekId = week.weekId;
        weekDto.weekNumber = week.weekNumber;
        weekDto.seasonId = week.season.seasonId;
        weekDto.seasonNumber = week.season.seasonNumber;
        weekDto.playingOnDate = week.playingOnDate;
        weekDto.isCurrentWeek = week.isCurrentWeek;

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

    public async updateWeekPlayingOnDate(
        leagueId: string,
        weekId: string,
        playingOnDate: Date
    ): Promise<void> {
        const week = await this.weekRepository.findOne(weekId, {
            relations: ['season', 'season.league']
        });

        if (week.season.league.leagueId !== leagueId) {
            throw new ForbiddenException('Season does not belong to league');
        }

        week.playingOnDate = playingOnDate;
        await this.weekRepository.save(week);
    }

    public async createCourtForWeek(
        leagueId: string,
        weekId: string,
        courtNumber: number
    ): Promise<void> {
        const week = await this.weekRepository.findOne(weekId, {
            relations: ['season', 'season.league', 'courts']
        });

        if (week.season.league.leagueId !== leagueId) {
            throw new ForbiddenException('Season does not belong to league');
        }

        const orderedCourts = week.courts.sort(
            (a, b) => a.courtPosition - b.courtPosition
        );
        const courtPosition =
            orderedCourts.length > 0
                ? orderedCourts[orderedCourts.length - 1].courtPosition + 1
                : 1;

        const court = new Court();
        court.courtNumber = courtNumber;
        court.week = week;
        court.courtPosition = courtPosition;
        await this.courtRepository.save(court);
    }

    public async updateCourtNumber(
        leagueId: string,
        courtId: string,
        courtNumber: number
    ): Promise<void> {
        const court = await this.courtRepository.findOne(courtId, {
            relations: ['week', 'week.season', 'week.season.league']
        });

        if (court.week.season.league.leagueId !== leagueId) {
            throw new ForbiddenException('Court does not belong to league.');
        }

        court.courtNumber = courtNumber;
        await this.courtRepository.save(court);
    }

    public async updateCourtOrder(
        leagueId: string,
        courtPositions: { courtId: string; courtPosition: number }[]
    ): Promise<void> {
        for (const courtPosition of courtPositions) {
            const court = await this.courtRepository.findOne(
                courtPosition.courtId,
                {
                    relations: ['week', 'week.season', 'week.season.league']
                }
            );

            if (court.week.season.league.leagueId !== leagueId) {
                throw new ForbiddenException(
                    'Court does not belong to league.'
                );
            }

            court.courtPosition = courtPosition.courtPosition;
            await this.courtRepository.save(court);
        }
    }

    public async deleteCourt(leagueId: string, courtId: string): Promise<void> {
        const court = await this.courtRepository.findOne(courtId, {
            relations: [
                'week',
                'week.season',
                'week.season.league',
                'players',
                'sets'
            ]
        });

        if (court.week.season.league.leagueId !== leagueId) {
            throw new ForbiddenException('Court does not belong to league.');
        }

        if (court.players.length > 0 || court.sets.length > 0) {
            throw new BadRequestException(
                'Can not delete court that has players or scores associated to it.'
            );
        }

        await this.courtRepository.remove(court);
    }

    public async createOrUpdateSet(
        leagueId: string,
        courtId: string,
        newSet: SetDto
    ): Promise<void> {
        const court = await this.courtRepository.findOne(courtId, {
            relations: ['week', 'week.season', 'week.season.league']
        });

        if (court.week.season.league.leagueId !== leagueId) {
            throw new ForbiddenException('Court does not belong to league.');
        }
        const team1Player1 = await this.playerRepository.findOne(
            newSet.team1.player1Id
        );
        const team1Player2 = await this.playerRepository.findOne(
            newSet.team1.player2Id
        );
        const team2Player1 = await this.playerRepository.findOne(
            newSet.team2.player1Id
        );
        const team2Player2 = await this.playerRepository.findOne(
            newSet.team2.player2Id
        );

        if (newSet.setId) {
            const existingSet = await this.setRepository.findOne(newSet.setId);

            existingSet.team1Score = newSet.team1.score;
            existingSet.team1Player1 = team1Player1;
            existingSet.team1Player2 = team1Player2;

            existingSet.team2Score = newSet.team2.score;
            existingSet.team2Player1 = team2Player1;
            existingSet.team2Player2 = team2Player2;

            await this.setRepository.save(existingSet);
        } else {
            const set = new Set();
            set.setNumber = newSet.setNumber;
            set.team1Score = newSet.team1.score;
            set.team1Player1 = team1Player1;
            set.team1Player2 = team1Player2;

            set.team2Score = newSet.team2.score;
            set.team2Player1 = team2Player1;
            set.team2Player2 = team2Player2;

            set.court = court;
            await this.setRepository.save(set);
        }
    }

    public async updatePlayerAdjustedTotal(
        leagueId: string,
        playerId: string,
        adjustedTotal: number
    ): Promise<void> {
        const player = await this.playerRepository.findOne(playerId, {
            relations: [
                'court',
                'court.week',
                'court.week.season',
                'court.week.season.league'
            ]
        });

        if (player.court.week.season.league.leagueId !== leagueId) {
            throw new ForbiddenException('Player does not belong to league.');
        }

        player.adjustedTotalScore = adjustedTotal;
        await this.playerRepository.save(player);
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
}
