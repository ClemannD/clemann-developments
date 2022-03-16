import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Account } from './account.entity';
import { Expense } from './expense.entity';

@Entity()
export class Month {
    @PrimaryGeneratedColumn('uuid')
    monthId: string;

    @Column()
    year: number;

    @Column()
    month: number;

    @ManyToOne(() => Account)
    account: Account;

    @OneToMany(() => Expense, (expense) => expense.month)
    expenses: Expense[];
}
