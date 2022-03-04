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
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    expenseId: string;

    @Column()
    name: string;

    @Column()
    year: number;

    @Column()
    month: number;

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

    @ManyToOne(() => Category)
    category: Category;

    @ManyToOne(() => Subcategory)
    subcategory: Subcategory;

    @ManyToMany(() => Tag)
    tags: Tag[];
}
