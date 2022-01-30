import { UserToLeague } from './userToLeague.entity';

export enum UserRole {
    Admin = 'Admin',
    Manager = 'Manager',
    Player = 'Player',
    Unassigned = 'Unassigned'
}

export enum UserStatus {
    Placeholder = 'Placeholder',
    Replaced = 'Replaced',
    Registered = 'Registered'
}

export class User {
    userId?: string;
    thirdPartyId?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
    oldUserId?: string;
    status?: UserStatus;
    createdAt?: Date;
    updatedAt?: Date;
    userToLeague?: UserToLeague[];
}
