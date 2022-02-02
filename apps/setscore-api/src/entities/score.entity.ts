import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class Score {
    @PrimaryGeneratedColumn('uuid')
    scoreId: string;

    @Column()
    setNumber: number;

    @Column()
    score: number;

    @ManyToOne(() => Player, (player) => player.scores)
    player: Player;
}
