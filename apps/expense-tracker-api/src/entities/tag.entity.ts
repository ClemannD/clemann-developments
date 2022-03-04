import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    tagId: string;

    @Column()
    name: string;

    @Column({
        default: true
    })
    active: boolean;

    @ManyToOne(() => Account, (account) => account.tags)
    account: Account;
}
