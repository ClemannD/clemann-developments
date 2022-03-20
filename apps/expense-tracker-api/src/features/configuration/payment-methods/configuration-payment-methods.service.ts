import { PaymentMethodDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../../entities/account.entity';
import { PaymentMethod } from '../../../entities/payment-method.entity';

@Injectable()
export class ConfigurationPaymentMethodsService {
    constructor(
        @InjectRepository(PaymentMethod)
        private paymentMethodRepository: Repository<PaymentMethod>,

        @InjectRepository(Account)
        private accountRepository: Repository<Account>
    ) {}

    private sortByName(a: PaymentMethod, b: PaymentMethod): number {
        if (a.name < b.name) {
            return -1;
        }

        if (a.name > b.name) {
            return 1;
        }

        return 0;
    }

    public async getPaymentMethods(
        accountId: string
    ): Promise<PaymentMethodDto[]> {
        const account = await this.accountRepository.findOne(accountId, {
            relations: ['paymentMethods']
        });

        if (!account) {
            throw new Error('Account does not exist.');
        }

        const activePaymentMethods = account.paymentMethods
            .filter((paymentMethod) => paymentMethod.active)
            .sort(this.sortByName);

        const inactivePaymentMethods = account.paymentMethods
            .filter((paymentMethod) => !paymentMethod.active)
            .sort(this.sortByName);

        return [...activePaymentMethods, ...inactivePaymentMethods].map(
            (paymentMethod) => ({
                paymentMethodId: paymentMethod.paymentMethodId,
                name: paymentMethod.name,
                active: paymentMethod.active
            })
        );
    }

    public async createPaymentMethod(
        accountId: string,
        name: string
    ): Promise<void> {
        const account = await this.accountRepository.findOne(accountId);

        if (!account) {
            throw new Error('Account does not exist.');
        }

        const paymentMethod = new PaymentMethod();
        paymentMethod.name = name;
        paymentMethod.active = true;
        paymentMethod.account = account;

        await this.paymentMethodRepository.save(paymentMethod);
    }

    public async updatePaymentMethod(
        accountId: string,
        paymentMethodId: string,
        name: string,
        active: boolean
    ): Promise<void> {
        const account = await this.accountRepository.findOne(accountId);

        if (!account) {
            throw new Error('Account does not exist.');
        }

        const paymentMethod = await this.paymentMethodRepository.findOne(
            paymentMethodId,
            {
                relations: ['account']
            }
        );

        if (!paymentMethod) {
            throw new Error('PaymentMethod does not exist.');
        }

        if (paymentMethod.account.accountId !== accountId) {
            throw new Error('PaymentMethod does not belong to account.');
        }

        paymentMethod.name = name;
        paymentMethod.active = active;

        await this.paymentMethodRepository.save(paymentMethod);
    }
}
