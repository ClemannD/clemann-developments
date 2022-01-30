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
import { Season } from './season.entity';

@Entity()
export class Week {
    @PrimaryGeneratedColumn('uuid')
    weekId: string;

    @Column()
    weekNumber: number;

    @Column({ nullable: true })
    playingOnDate: Date;

    @Column({ default: false })
    isCurrentWeek: boolean;

    @ManyToOne(() => Season, (season) => season.weeks)
    season: Season;

    @OneToMany(() => Court, (court) => court.week, {
        cascade: ['insert', 'update', 'remove']
    })
    courts: Court[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
