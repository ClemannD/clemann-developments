import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Court } from '../../../entities/court.entity';
import { League } from '../../../entities/league.entity';
import { Player } from '../../../entities/player.entity';
import { Season } from '../../../entities/season.entity';
import { Week } from '../../../entities/week.entity';
import { CourtDto } from '../week/manager-week.dtos';
import { SeasonSummaryDto } from './manager-dashboard.dtos';

@Injectable()
export class ManagerDashboardService {
    constructor(
        @InjectRepository(League)
        private leagueRepository: Repository<League>,
        @InjectRepository(Season)
        private seasonRepository: Repository<Season>,
        @InjectRepository(Week)
        private weekRepository: Repository<Week>
    ) {}

    public async getSeasonsSummary(
        leagueId: string
    ): Promise<SeasonSummaryDto[]> {
        const league = await this.leagueRepository.findOne({
            where: { leagueId },
            relations: ['seasons', 'seasons.weeks', 'seasons.weeks.courts']
        });
        const seasons = await league.seasons;

        const seasonSummaries: SeasonSummaryDto[] = seasons.map((season) => {
            const weeksSorted = season.weeks.sort((a, b) => {
                return a.weekNumber - b.weekNumber;
            });

            const weekSummaries = weeksSorted.map((week) => {
                return {
                    weekNumber: week.weekNumber,
                    weekId: week.weekId,
                    playingOnDate: week.playingOnDate,
                    isCurrentWeek: week.isCurrentWeek,
                    courtCount: week.courts.length
                };
            });

            return {
                seasonId: season.seasonId,
                seasonNumber: season.seasonNumber,
                seasonStartDate: weeksSorted[0]?.playingOnDate,
                seasonEndDate:
                    weeksSorted[weeksSorted.length - 1]?.playingOnDate,
                weekSummaries: weekSummaries,
                isCurrentSeason: season.isCurrentSeason
            };
        });

        return seasonSummaries;
    }

    public async updateLeagueNotes(
        leagueId: string,
        notes: string
    ): Promise<void> {
        const league = await this.leagueRepository.findOne({
            where: { leagueId }
        });

        league.notes = notes;

        await this.leagueRepository.save(league);
    }

    public async startNewSeason(
        leagueId: string,
        seasonNumber: number,
        playingOnDate: Date
    ): Promise<void> {
        const league = await this.leagueRepository.findOne({
            where: { leagueId },
            relations: ['seasons']
        });

        const oldCurrentSeason = league.seasons.find((season) => {
            return season.isCurrentSeason;
        });

        const season = new Season();
        season.seasonNumber = seasonNumber;
        season.league = league;
        season.isCurrentSeason = true;

        if (oldCurrentSeason) {
            oldCurrentSeason.isCurrentSeason = false;
            await this.seasonRepository.save(oldCurrentSeason);

            const oldCurrentWeek = await this.weekRepository.findOne({
                where: {
                    season: oldCurrentSeason,
                    isCurrentWeek: true
                },
                relations: ['courts', 'courts.players']
            });

            if (oldCurrentWeek) {
                oldCurrentWeek.isCurrentWeek = false;
                await this.weekRepository.save(oldCurrentWeek);

                const firstWeek = new Week();
                firstWeek.weekNumber = 1;
                firstWeek.playingOnDate = playingOnDate;

                firstWeek.courts = oldCurrentWeek.courts.map((court) => {
                    const newCourt = new Court();
                    newCourt.courtNumber = court.courtNumber;
                    newCourt.courtPosition = court.courtPosition;
                    return newCourt;
                });
                firstWeek.isCurrentWeek = true;

                season.weeks = [firstWeek];
            }
        }
        await this.seasonRepository.save(season);
    }

    public async addWeek(
        leagueId: string,
        seasonId: string,
        weekNumber: number,
        playingOnDate: Date
    ): Promise<void> {
        const season = await this.seasonRepository.findOne({
            where: { seasonId },
            relations: [
                'weeks',
                'league',
                'weeks.courts',
                'weeks.courts.players',
                'weeks.courts.players.user'
            ]
        });

        if (season.league.leagueId !== leagueId) {
            throw new Error('Season does not belong to league');
        }

        const currentWeek = season.weeks.find((week) => {
            return week.isCurrentWeek;
        });

        let newCourts: Court[] = [];

        if (currentWeek) {
            currentWeek.isCurrentWeek = false;
            await this.weekRepository.save(currentWeek);

            currentWeek.courts?.forEach((court) => {
                const newCourt = new Court();
                newCourt.courtNumber = court.courtNumber;
                newCourt.players = court.players.map((player) => {
                    const newPlayer = new Player();
                    newPlayer.user = player.user;
                    newPlayer.playerPosition = player.playerPosition;
                    return newPlayer;
                });
                newCourt.courtPosition = court.courtPosition;
                newCourts.push(newCourt);
            });
        }

        const week = new Week();
        week.weekNumber = weekNumber;
        week.season = season;
        week.isCurrentWeek = true;
        week.courts = newCourts;
        week.playingOnDate = playingOnDate || new Date();

        await this.weekRepository.save(week);
    }
}
