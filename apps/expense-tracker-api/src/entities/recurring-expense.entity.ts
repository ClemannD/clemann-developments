import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Category } from './category.entity';
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

    @ManyToOne(() => Category)
    category: Category;

    @ManyToOne(() => Subcategory)
    subcategory: Subcategory;

    @ManyToMany(() => Tag)
    tags: Tag[];
}
