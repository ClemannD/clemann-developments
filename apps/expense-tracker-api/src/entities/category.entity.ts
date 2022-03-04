import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Account } from './account.entity';
import { Subcategory } from './subcategory.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    categoryId: string;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column({
        default: true
    })
    active: boolean;

    @ManyToOne(() => Account, (account) => account.categories)
    account: Account;

    @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
    subcategories: Subcategory[];
}
