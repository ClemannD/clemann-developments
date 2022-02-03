import { Repository } from 'typeorm';
import { League } from '../../../entities/league.entity';
import { User } from '../../../entities/user.entity';
import { UserToLeague } from '../../../entities/userToLeague.entity';
import { AdminUsersService } from '../users/admin-users.service';

import { AdminLeaguesService } from './admin-leagues.service';
import { CreateLeagueRequest } from './admin-leagues.dto';
import { PaginationAndSort } from '../../../common/pagination-and-sort';

export function createMockRepository({
    findResult = [],
    findOneResult = null
} = {}) {
    return {
        find: jest.fn().mockReturnValue(findResult),
        findOne: jest.fn().mockReturnValue(findOneResult),
        save: jest.fn((input) => input),
        findAndCount: jest.fn().mockReturnValue([findResult, findResult.length])
    };
}

describe('AdminLeagueService', () => {
    const createMockUsersService = () => {
        return {
            find: jest.fn(),
            findOne: jest.fn()
        } as unknown as AdminUsersService;
    };

    const createStubbedAdminLeaguesService = ({
        leaguesRepository = createMockRepository(),
        userToLeagueRepository = createMockRepository(),
        userRepository = createMockRepository(),
        usersService = createMockUsersService()
    } = {}) =>
        //  = {
        //     leaguesRepository: MockRepository,
        //     userToLeagueRepository: MockRepository,
        //     usersService: createMockUsersService()
        // }
        {
            return new AdminLeaguesService(
                userRepository as unknown as Repository<User>,
                leaguesRepository as unknown as Repository<League>,
                userToLeagueRepository as unknown as Repository<UserToLeague>
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

        const result = await service.listLeagues(new PaginationAndSort(), {});

        expect(mockLeaguesRepository.findAndCount).toHaveBeenCalled();
        expect(result).toStrictEqual([[mockLeague], 1]);
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

        await service.createLeague(
            createLeagueRequest.name,
            createLeagueRequest.state,
            createLeagueRequest.city
        );

        expect(mockLeaguesRepository.save).toHaveBeenCalled();
    });
});
