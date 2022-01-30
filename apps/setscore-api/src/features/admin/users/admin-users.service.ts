import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
    findPaginatedAndSort,
    PaginationAndSort
} from '../../../common/pagination-and-sort';
import { User, UserRole, UserStatus } from '../../../entities/user.entity';

@Injectable()
export class AdminUsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getUser(userId: string): Promise<User> {
        return this.userRepository.findOne(userId, {
            relations: ['userToLeague', 'userToLeague.league']
        });
    }

    async listUsers(
        paginationAndSort: PaginationAndSort,
        filters: any
    ): Promise<[User[], number]> {
        let whereConditions;

        if (filters) {
            const roleOptions = [];
            if (filters.showAdmins) {
                roleOptions.push(UserRole.Admin);
            }
            if (filters.showManagers) {
                roleOptions.push(UserRole.Manager);
            }
            if (filters.showPlayers) {
                roleOptions.push(UserRole.Player);
            }
            if (filters.showUnassigned) {
                roleOptions.push(UserRole.Unassigned);
            }

            const statusOptions = [];
            if (filters.showRegistered) {
                statusOptions.push(UserStatus.Registered);
            }
            if (filters.showPlaceholders) {
                statusOptions.push(UserStatus.Placeholder);
            }
            if (filters.showReplaced) {
                statusOptions.push(UserStatus.Replaced);
            }

            whereConditions = {
                role: In(roleOptions),
                status: In(statusOptions)
            };
        }

        return await findPaginatedAndSort<User>(
            this.userRepository,
            paginationAndSort,
            whereConditions,
            'firstName'
        );
    }

    async createUser(
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    ): Promise<void> {
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;

        await this.userRepository.save(user);
    }

    async editUser(
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    ): Promise<void> {
        const user = await this.userRepository.findOne(userId);
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;

        await this.userRepository.save(user);
    }

    async deleteUser(userId: string): Promise<void> {
        await this.userRepository.delete(userId);
    }

    async updateUserRole(userId: string, role: UserRole): Promise<void> {
        const user = await this.getUser(userId);
        user.role = role;
        await this.userRepository.save(user);
    }
}
