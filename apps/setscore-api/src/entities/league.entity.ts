import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Season } from './season.entity';
import { UserToLeague } from './userToLeague.entity';

@Entity()
export class League {
    @PrimaryGeneratedColumn('uuid')
    leagueId: string;

    @Column()
    name: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column({
        nullable: true
    })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserToLeague, (userToLeague) => userToLeague.league, {
        cascade: ['insert', 'update', 'remove']
    })
    userToLeague!: UserToLeague[];

    @OneToMany(() => Season, (season) => season.league, {
        cascade: ['insert', 'update', 'remove']
    })
    seasons: Season[];
}
