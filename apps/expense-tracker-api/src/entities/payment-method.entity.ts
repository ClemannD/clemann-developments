import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn('uuid')
    paymentMethodId: string;

    @Column()
    name: string;

    @Column({
        default: true
    })
    active: boolean;

    @ManyToOne(() => Account, (account) => account.paymentMethods)
    account: Account;
}
