import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Court } from './court.entity';
import { Player } from './player.entity';

@Entity()
export class Set {
    @PrimaryGeneratedColumn('uuid')
    setId: string;

    @Column()
    setNumber: number;

    @ManyToOne(() => Player)
    team1Player1: Player;

    @ManyToOne(() => Player)
    team1Player2: Player;

    @Column()
    team1Score: number;

    @ManyToOne(() => Player)
    team2Player1: Player;

    @ManyToOne(() => Player)
    team2Player2: Player;

    @Column()
    team2Score: number;

    @ManyToOne(() => Court, (court) => court.players)
    court: Court;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
