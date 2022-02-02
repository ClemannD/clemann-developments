import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Player } from './player.entity';
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

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({
        unique: true,
        nullable: true
    })
    thirdPartyId: string;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    phone: string;

    @Column({
        nullable: true
    })
    firstName: string;

    @Column({
        nullable: true
    })
    lastName: string;

    @Column({
        default: UserRole.Player
    })
    role: UserRole;

    @Column({
        default: UserStatus.Placeholder
    })
    status: UserStatus;

    @Column({
        nullable: true
    })
    oldUserId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserToLeague, (userToLeague) => userToLeague.user, {
        cascade: ['insert', 'update', 'remove']
    })
    userToLeague!: UserToLeague[];

    @OneToMany(() => Player, (player) => player.user)
    players: Player[];
}
