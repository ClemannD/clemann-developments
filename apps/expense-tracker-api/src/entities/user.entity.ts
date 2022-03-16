import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({
        unique: true,
        nullable: true
    })
    thirdPartyId: string;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    phone: string;

    @Column({
        nullable: true
    })
    firstName: string;

    @Column({
        nullable: true
    })
    lastName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Account, (account) => account.user)
    account: Account;
}
