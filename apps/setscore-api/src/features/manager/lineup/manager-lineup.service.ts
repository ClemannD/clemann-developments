import {
    BadRequestException,
    ForbiddenException,
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Court } from '../../../entities/court.entity';
import { League } from '../../../entities/league.entity';
import { Player, SubReason } from '../../../entities/player.entity';
import { Season } from '../../../entities/season.entity';
import { User } from '../../../entities/user.entity';
import {
    LeagueMemberType,
    UserToLeague
} from '../../../entities/userToLeague.entity';
import { Week } from '../../../entities/week.entity';
import {
    CourtUpdateDto,
    LineupCourtDto,
    LineupDto,
    LineupPlayerDto,
    SubDto
} from './manager-lineup.dtos';

@Injectable()
export class ManagerLineupService {
    constructor(
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(League)
        private leagueRepository: Repository<League>,
        @InjectRepository(UserToLeague)
        private userToLeagueRepository: Repository<UserToLeague>,
        @InjectRepository(Season)
        private seasonRepository: Repository<Season>,
        @InjectRepository(Week)
        private weekRepository: Repository<Week>,
        @InjectRepository(Court)
        private courtRepository: Repository<Court>
    ) {}

    public async getLineup(
        leagueId: string,
        weekId: string
    ): Promise<LineupDto> {
        let week: Week;

        if (weekId) {
            week = await this.weekRepository.findOne(weekId, {
                relations: [
                    'season',
                    'season.league',
                    'courts',
                    'courts.players',
                    'courts.players.user',
                    'courts.players.scores',
                    'courts.players.sub',
                    'courts.players.sub.user',
                    'courts.sets'
                ]
            });

            if (week.season.league.leagueId !== leagueId) {
                throw new ForbiddenException('Week does not belong to league');
            }
        } else {
            week = (
                await this.leagueRepository.findOne(leagueId, {
                    relations: [
                        'seasons',
                        'seasons.weeks',
                        'seasons.weeks.season',
                        'seasons.weeks.courts',
                        'seasons.weeks.courts.players',
                        'seasons.weeks.courts.players.user',
                        'seasons.weeks.courts.players.sub',
                        'seasons.weeks.courts.players.sub.user'
                    ]
                })
            ).seasons
                .find((s) => s.isCurrentSeason)
                .weeks.find((w) => w.isCurrentWeek);
        }

        const lineupDto = new LineupDto();
        lineupDto.weekId = week.weekId;
        lineupDto.weekNumber = week.weekNumber;
        lineupDto.seasonId = week.season.seasonId;
        lineupDto.seasonNumber = week.season.seasonNumber;
        lineupDto.playingOnDate = week.playingOnDate;
        lineupDto.isCurrentWeek = week.isCurrentWeek;

        const orderedCourts = week.courts.sort(
            (a, b) => a.courtPosition - b.courtPosition
        );

        const assignedUserIds = [];

        lineupDto.courts = orderedCourts.map((court) => {
            const courtDto = new LineupCourtDto();
            courtDto.courtId = court.courtId;
            courtDto.courtNumber = court.courtNumber;
            courtDto.courtPosition = court.courtPosition;

            const orderedPlayers = court.players.sort(
                (a, b) => a.playerPosition - b.playerPosition
            );

            courtDto.players = orderedPlayers.map((player) => {
                const playerDto = new LineupPlayerDto();
                playerDto.playerId = player?.playerId;
                playerDto.userId = player?.user?.userId;
                playerDto.firstName = player?.user.firstName;
                playerDto.lastName = player?.user.lastName;

                playerDto.subUserId = player?.sub?.user?.userId;
                playerDto.subReason = player?.subReason;
                playerDto.subName =
                    player?.sub?.user.firstName +
                    ' ' +
                    player?.sub?.user.lastName;

                assignedUserIds.push(player.user.userId);
                return playerDto;
            });

            return courtDto;
        });

        const userToLeagues = await this.userToLeagueRepository.find({
            where: { leagueId },
            relations: ['user']
        });

        const unassignedUsers = userToLeagues.filter((userToLeague) => {
            return (
                !assignedUserIds.includes(userToLeague.user.userId) &&
                (userToLeague.leagueMemberType === LeagueMemberType.Player ||
                    userToLeague.leagueMemberType === LeagueMemberType.Manager)
            );
        });

        lineupDto.unassignedPlayers = unassignedUsers
            .map((userToLeague) => {
                const playerDto = new LineupPlayerDto();
                playerDto.firstName = userToLeague.user.firstName;
                playerDto.lastName = userToLeague.user.lastName;
                playerDto.userId = userToLeague.user.userId;
                return playerDto;
            })
            .sort((a, b) => {
                if (a.firstName < b.firstName) {
                    return -1;
                }
                if (a.firstName > b.firstName) {
                    return 1;
                }
                return 0;
            });

        lineupDto.isLineupLocked = await this.isLineupLocked(week.weekId);
        return lineupDto;
    }

    public async updateLineup(
        leagueId: string,
        weekId: string,
        courtUpdates: CourtUpdateDto[]
    ): Promise<void> {
        const week = await this.weekRepository.findOne(weekId, {
            relations: ['season', 'season.league', 'courts', 'courts.players']
        });

        if (week.season.league.leagueId !== leagueId) {
            throw new ForbiddenException('Week does not belong to league.');
        }

        if (await this.isLineupLocked(week.weekId)) {
            throw new BadRequestException('Lineup is locked.');
        }

        const assignedWeekPlayers: string[] = [];

        for (const court of week.courts) {
            const courtUpdatePlayers = courtUpdates.find(
                (courtUpdate) => courtUpdate.courtId === court.courtId
            ).players;

            for (const courtUpdatePlayer of courtUpdatePlayers) {
                let player;

                if (courtUpdatePlayer.playerId) {
                    player = await this.playerRepository.findOne(
                        courtUpdatePlayer.playerId
                    );
                } else {
                    player = new Player();
                    player.user = await this.userRepository.findOne(
                        courtUpdatePlayer.userId
                    );
                }
                player.court = court;
                player.playerPosition = courtUpdatePlayers.findIndex(
                    (courtUpdate) => courtUpdate.playerId === player.playerId
                );
                const createdPlayer = await this.playerRepository.save(player);
                assignedWeekPlayers.push(createdPlayer.playerId);
            }
        }

        // Remove unassigned players from courts.
        const allWeekPlayers = await this.playerRepository.find({
            where: { court: In(week.courts.map((court) => court.courtId)) }
        });

        for (const player of allWeekPlayers) {
            if (!assignedWeekPlayers.includes(player.playerId)) {
                player.court = null;
                player.playerPosition = null;
                await this.playerRepository.save(player);
            }
        }
    }

    public async listSubs(leagueId: string): Promise<SubDto[]> {
        const subs = await this.userToLeagueRepository.find({
            where: { leagueId, leagueMemberType: LeagueMemberType.Sub },
            relations: ['user']
        });

        return subs.map((sub) => {
            const subDto = new SubDto();
            subDto.subUserId = sub.user.userId;
            subDto.subName = `${sub.user.firstName} ${sub.user.lastName}`;
            return subDto;
        });
    }

    public async updatePlayerSub(
        leagueId: string,
        playerId: string,
        subUserId: string,
        subReason: SubReason
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

        if (subUserId === null) {
            player.sub = null;
            player.subReason = null;
        } else {
            const subUserToLeague = await this.userToLeagueRepository.findOne(
                { userId: subUserId, leagueId: leagueId },
                {
                    relations: ['user', 'league']
                }
            );

            if (subUserToLeague.leagueMemberType !== LeagueMemberType.Sub) {
                throw new BadRequestException('User is not a sub.');
            }

            player.sub = subUserToLeague;
            player.subReason = subReason;
        }
        await this.playerRepository.save(player);
    }

    public async isLineupLocked(weekId: string): Promise<boolean> {
        const week = await this.weekRepository.findOne(weekId, {
            relations: ['courts', 'courts.sets']
        });

        const isLineupLocked = week.courts.some(
            (court) => court.sets.length > 0
        );
        return isLineupLocked;
    }
}
