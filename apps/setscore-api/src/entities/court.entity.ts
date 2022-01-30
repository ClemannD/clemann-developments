import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Player } from './player.entity';
import { Set } from './set.entity';
import { Week } from './week.entity';

@Entity()
export class Court {
    @PrimaryGeneratedColumn('uuid')
    courtId: string;

    @Column()
    courtNumber: number;

    @Column()
    courtPosition: number;

    @ManyToOne(() => Week, (week) => week.courts)
    week: Week;

    @OneToMany(() => Set, (set) => set.court, {
        cascade: ['insert', 'update', 'remove']
    })
    sets: Set[];

    @OneToMany(() => Player, (player) => player.court, {
        cascade: ['insert', 'update', 'remove']
    })
    players: Player[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
