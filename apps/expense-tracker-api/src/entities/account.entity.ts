import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Category } from './category.entity';
import { Expense } from './expense.entity';
import { PaymentMethod } from './payment-method.entity';
import { RecurringExpense } from './recurring-expense.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    accountId: string;

    @Column()
    accountName: string;

    @OneToMany(() => Category, (category) => category.account)
    categories: Category[];

    @OneToMany(() => Tag, (tag) => tag.account)
    tags: Tag[];

    @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.account)
    paymentMethods: PaymentMethod[];

    @OneToMany(() => Expense, (expense) => expense.account)
    expenses: Expense[];

    @OneToMany(
        () => RecurringExpense,
        (recurringExpense) => recurringExpense.account
    )
    recurringExpenses: RecurringExpense[];

    @OneToOne(() => User, (user) => user.account)
    @JoinColumn()
    user: User;
}
