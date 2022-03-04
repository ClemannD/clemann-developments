import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Subcategory {
    @PrimaryGeneratedColumn('uuid')
    subcategoryId: string;

    @Column()
    name: string;

    @Column({
        default: true
    })
    active: boolean;

    @ManyToOne(() => Category, (category) => category.subcategories)
    category: Category;
}
