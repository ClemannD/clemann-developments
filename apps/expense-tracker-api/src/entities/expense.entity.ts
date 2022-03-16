import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Account } from './account.entity';
import { Category } from './category.entity';
import { Month } from './month.entity';
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

    @ManyToOne(() => Month)
    month: Month;

    @ManyToOne(() => Subcategory)
    subcategory: Subcategory;

    @ManyToMany(() => Tag)
    tags: Tag[];
}
