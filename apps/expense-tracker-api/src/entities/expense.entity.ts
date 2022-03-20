import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Category } from './category.entity';
import { Month } from './month.entity';
import { PaymentMethod } from './payment-method.entity';
import { Subcategory } from './subcategory.entity';
import { Tag } from './tag.entity';

@Entity()
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    expenseId: string;

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
        nullable: true
    })
    splitPaid: boolean;

    @Column({
        nullable: true
    })
    notes: string;

    @Column({
        default: false
    })
    isRecurring: boolean;

    @ManyToOne(() => Category)
    category: Category;

    @ManyToOne(() => PaymentMethod)
    paymentMethod: PaymentMethod;

    @ManyToOne(() => Month)
    month: Month;

    @ManyToOne(() => Subcategory)
    subcategory: Subcategory;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];
}
