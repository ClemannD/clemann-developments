import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Category } from './category.entity';
import { PaymentMethod } from './payment-method.entity';
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

    @OneToOne(() => User, (user) => user.account)
    @JoinColumn()
    user: User;
}
