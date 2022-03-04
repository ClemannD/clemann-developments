import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { PaymentMethod } from './payment-method.entity';
import { Tag } from './tag.entity';

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    accountId: string;

    @OneToMany(() => Category, (category) => category.account)
    categories: Category[];

    @OneToMany(() => Tag, (tag) => tag.account)
    tags: Tag[];

    @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.account)
    paymentMethods: PaymentMethod[];
}
