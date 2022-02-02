import { CreateLeagueRequest, CreateLeagueResponse } from './leagues.dto';
import { getHeapStatistics } from 'node:v8';
import { Repository } from 'typeorm';
import { League } from '../entities/league.entity';
import { UsersService } from '../users/users.service';
import { UserToLeague } from '../entities/userToLeague.entity';
import { AdminLeaguesService } from './admin-leagues.service';

export function createMockRepository({
    findResult = [],
    findOneResult = null
} = {}) {
    return {
        find: jest.fn().mockReturnValue(findResult),
        findOne: jest.fn().mockReturnValue(findOneResult),
        save: jest.fn((input) => input)
    };
}

describe('AdminLeagueService', () => {
    const createMockUsersService = () => {
        return ({
            find: jest.fn(),
            findOne: jest.fn()
        } as unknown) as UsersService;
    };

    const createStubbedAdminLeaguesService = ({
        leaguesRepository = createMockRepository(),
        userToLeagueRepository = createMockRepository(),
        usersService = createMockUsersService()
    } = {}) =>
        //  = {
        //     leaguesRepository: MockRepository,
        //     userToLeagueRepository: MockRepository,
        //     usersService: createMockUsersService()
        // }
        {
            return new AdminLeaguesService(
                (leaguesRepository as unknown) as Repository<League>,
                (userToLeagueRepository as unknown) as Repository<UserToLeague>,
                usersService
            );
        };

    const mockLeague = {
        leagueId: 'mockLeagueId'
    };
    it('should be defined', () => {
        const service = createStubbedAdminLeaguesService();
        expect(service).toBeDefined();
    });

    it('listLeagues()', async () => {
        const mockLeaguesRepository = createMockRepository({
            findResult: [mockLeague]
        });

        const service = createStubbedAdminLeaguesService({
            leaguesRepository: mockLeaguesRepository
        });

        const result = await service.listLeagues();

        expect(mockLeaguesRepository.find).toHaveBeenCalled();
        expect(result).toStrictEqual([mockLeague]);
    });

    it('getLeague()', async () => {
        const mockLeaguesRepository = createMockRepository({
            findOneResult: mockLeague
        });
        const service = createStubbedAdminLeaguesService({
            leaguesRepository: mockLeaguesRepository
        });

        const result = await service.getLeague('mockLeagueId');

        expect(mockLeaguesRepository.findOne).toHaveBeenCalledWith(
            'mockLeagueId',
            {
                relations: ['userToLeague', 'userToLeague.user']
            }
        );
        expect(result).toBe(mockLeague);
    });

    it('findMembers()', async () => {
        const mockLeagueMembers = [
            {
                userId: 'mockUserId'
            }
        ];

        const mockLeaguesRepository = createMockRepository({
            findOneResult: {
                ...mockLeague,
                userToLeague: mockLeagueMembers
            }
        });
        const service = createStubbedAdminLeaguesService({
            leaguesRepository: mockLeaguesRepository
        });

        const result = await service.findMembers('mockLeagueId');

        expect(mockLeaguesRepository.findOne).toHaveBeenCalledWith(
            'mockLeagueId',
            {
                relations: ['userToLeague']
            }
        );
        expect(result).toBe(mockLeagueMembers);
    });

    it('createLeague()', async () => {
        const createLeagueRequest: CreateLeagueRequest = {
            name: 'mockLeagueName',
            state: 'Florida',
            city: 'Sunrise'
        };

        const mockLeaguesRepository = createMockRepository();
        const service = createStubbedAdminLeaguesService({
            leaguesRepository: mockLeaguesRepository
        });

        const result = await service.createLeague(createLeagueRequest);

        expect(mockLeaguesRepository.save).toHaveBeenCalled();
        expect(result).toHaveProperty('name', createLeagueRequest.name);
    });
});
