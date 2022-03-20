import {
    ActiveCategoryDto,
    ActivePaymentMethodDto,
    ActiveTagDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { Category } from '../../entities/category.entity';
import { PaymentMethod } from '../../entities/payment-method.entity';
import { Subcategory } from '../../entities/subcategory.entity';
import { Tag } from '../../entities/tag.entity';

@Injectable()
export class ActiveOptionsService {
    constructor(
        @InjectRepository(Account)
        private readonly _accountRepository: Repository<Account>
    ) {}

    private sortByName(
        a: Category | Subcategory | Tag | PaymentMethod,
        b: Category | Subcategory | Tag | PaymentMethod
    ): number {
        if (a.name < b.name) {
            return -1;
        }

        if (a.name > b.name) {
            return 1;
        }

        return 0;
    }

    public async getActiveCategories(
        accountId: string
    ): Promise<ActiveCategoryDto[]> {
        const account = await this._accountRepository.findOne({
            where: {
                accountId
            },
            relations: ['categories', 'categories.subcategories']
        });

        if (!account) {
            throw new Error('Account not found');
        }

        return account.categories
            .filter((cat) => cat.active)
            .sort(this.sortByName)
            .map((category) => ({
                categoryId: category.categoryId,
                name: category.name,
                color: category.color,
                subcategories: category.subcategories
                    .filter((subcat) => subcat.active)
                    .sort(this.sortByName)
                    .map((subcategory) => ({
                        subcategoryId: subcategory.subcategoryId,
                        name: subcategory.name
                    }))
            }));
    }

    public async getActiveTags(accountId: string): Promise<ActiveTagDto[]> {
        const account = await this._accountRepository.findOne({
            where: {
                accountId
            },
            relations: ['tags']
        });

        if (!account) {
            throw new Error('Account not found');
        }

        return account.tags
            .filter((tag) => tag.active)
            .sort(this.sortByName)
            .map((tag) => ({
                tagId: tag.tagId,
                name: tag.name
            }));
    }

    public async getActivePaymentMethods(
        accountId: string
    ): Promise<ActivePaymentMethodDto[]> {
        const account = await this._accountRepository.findOne({
            where: {
                accountId
            },
            relations: ['paymentMethods']
        });

        if (!account) {
            throw new Error('Account not found');
        }

        return account.paymentMethods
            .filter((paymentMethod) => paymentMethod.active)
            .sort(this.sortByName)
            .map((paymentMethod) => ({
                paymentMethodId: paymentMethod.paymentMethodId,
                name: paymentMethod.name
            }));
    }
}
