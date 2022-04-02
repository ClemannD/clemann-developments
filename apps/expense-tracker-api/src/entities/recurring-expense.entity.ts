import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Account } from './account.entity';
import { Category } from './category.entity';
import { PaymentMethod } from './payment-method.entity';
import { Subcategory } from './subcategory.entity';
import { Tag } from './tag.entity';

@Entity()
export class RecurringExpense {
    @PrimaryGeneratedColumn('uuid')
    recurringExpenseId: string;

    @Column()
    name: string;

    @Column()
    day: number;

    @Column({
        default: 0
    })
    amountCents: number;

    @Column({
        nullable: true
    })
    split: number;

    @Column({
        default: true
    })
    active: boolean;

    @Column({
        nullable: true
    })
    notes: string;

    @ManyToOne(() => Category)
    category: Category;

    @ManyToOne(() => Subcategory)
    subcategory: Subcategory;

    @ManyToOne(() => PaymentMethod)
    paymentMethod: PaymentMethod;

    @ManyToOne(() => Account)
    account: Account;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];
}
