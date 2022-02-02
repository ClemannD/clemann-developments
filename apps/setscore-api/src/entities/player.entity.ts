import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Court } from './court.entity';
import { Score } from './score.entity';
import { User } from './user.entity';
import { UserToLeague } from './userToLeague.entity';

export enum SubReason {
    Vacation = 'Vacation',
    Injury = 'Injury',
    Other = 'Other'
}

@Entity()
export class Player {
    @PrimaryGeneratedColumn('uuid')
    playerId: string;

    @Column({
        nullable: true
    })
    playerPosition: number;

    @Column({
        nullable: true
    })
    adjustedTotalScore: number;

    @OneToMany(() => Score, (score) => score.player)
    scores: Score[];

    @ManyToOne(() => User, (user) => user.players)
    user: User;

    @ManyToOne(() => Court, (court) => court.players)
    court: Court;

    @ManyToOne(() => UserToLeague)
    sub: UserToLeague;

    @Column({
        nullable: true
    })
    subReason: SubReason;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
