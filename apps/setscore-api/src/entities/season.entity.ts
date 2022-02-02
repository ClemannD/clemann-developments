import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { League } from './league.entity';
import { Week } from './week.entity';

@Entity()
export class Season {
    @PrimaryGeneratedColumn('uuid')
    seasonId: string;

    @Column()
    seasonNumber: number;

    @Column({ default: false })
    isCurrentSeason: boolean;

    @Column({ nullable: true })
    leagueId: string;

    @ManyToOne(() => League, (league) => league.seasons)
    league: League;

    @OneToMany(() => Week, (week) => week.season, {
        cascade: ['insert', 'update', 'remove']
    })
    weeks: Week[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
