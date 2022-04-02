import {
    PaginationAndSort,
    SortDirection
} from '@clemann-developments/common-endpoint';
import { RecurringExpenseDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../../entities/account.entity';
import { Category } from '../../../entities/category.entity';
import { PaymentMethod } from '../../../entities/payment-method.entity';
import { RecurringExpense } from '../../../entities/recurring-expense.entity';
import { Subcategory } from '../../../entities/subcategory.entity';
import { Tag } from '../../../entities/tag.entity';
import { ExpenseSortingService } from '../../expense-sorting/expense-sorting.service';

@Injectable()
export class ConfigurationRecurringExpensesService {
    constructor(
        @InjectRepository(RecurringExpense)
        private _recurringExpenseRepository: Repository<RecurringExpense>,
        @InjectRepository(Category)
        private readonly _categoryRepository: Repository<Category>,
        @InjectRepository(Subcategory)
        private readonly _subcategoryRepository: Repository<Subcategory>,
        @InjectRepository(Tag)
        private readonly _tagRepository: Repository<Tag>,
        @InjectRepository(PaymentMethod)
        private readonly _paymentMethodRepository: Repository<PaymentMethod>,

        @InjectRepository(Account)
        private accountRepository: Repository<Account>,

        private _expenseSortingService: ExpenseSortingService
    ) {}

    public async listRecurringExpenses(
        accountId: string,
        paginationAndSort: PaginationAndSort
    ): Promise<RecurringExpenseDto[]> {
        const account = await this.accountRepository.findOne(accountId, {
            relations: [
                'recurringExpenses',
                'recurringExpenses.category',
                'recurringExpenses.subcategory',
                'recurringExpenses.tags',
                'recurringExpenses.paymentMethod'
            ]
        });

        const expenses = account.recurringExpenses;

        const expenseDtos: RecurringExpenseDto[] = expenses?.map((expense) => ({
            expenseId: expense.recurringExpenseId,
            name: expense.name,
            day: expense.day,
            amountCents: expense.amountCents,
            isRecurring: true,
            notes: expense.notes,
            split: expense.split,
            splitPaid: false,
            paymentMethod: expense.paymentMethod && {
                paymentMethodId: expense.paymentMethod.paymentMethodId,
                name: expense.paymentMethod.name
            },
            category: expense.category && {
                categoryId: expense.category.categoryId,
                name: expense.category.name,
                color: expense.category.color
            },
            subcategory: expense.subcategory && {
                subcategoryId: expense.subcategory.subcategoryId,
                name: expense.subcategory.name
            },
            tags:
                expense.tags &&
                expense.tags.map((tag) => ({
                    tagId: tag.tagId,
                    name: tag.name
                }))
        }));

        return this._expenseSortingService.sortExpenses(
            expenseDtos,
            paginationAndSort
        ) as RecurringExpenseDto[];
    }

    public async createOrUpdateRecurringExpense(
        accountId: string,
        recurringExpense: RecurringExpenseDto
    ): Promise<string> {
        const account = await this.accountRepository.findOne(accountId, {
            relations: ['recurringExpenses']
        });

        let paymentMethod: PaymentMethod;
        if (recurringExpense.paymentMethod) {
            paymentMethod = await this._paymentMethodRepository.findOne({
                where: {
                    paymentMethodId:
                        recurringExpense.paymentMethod.paymentMethodId
                }
            });
            if (!paymentMethod) {
                throw new Error('Payment method not found');
            }
        }

        let category: Category;
        if (recurringExpense.category) {
            category = await this._categoryRepository.findOne({
                where: {
                    categoryId: recurringExpense.category.categoryId
                },
                relations: ['account']
            });

            if (!category) {
                throw new Error('Category not found');
            }

            if (category.account.accountId !== accountId) {
                throw new Error('Category does not belong to account');
            }
        }

        let subcategory: Subcategory;
        if (recurringExpense.subcategory) {
            subcategory = await this._subcategoryRepository.findOne({
                where: {
                    subcategoryId: recurringExpense.subcategory.subcategoryId
                },
                relations: ['category']
            });

            if (!subcategory) {
                throw new Error('Subcategory not found');
            }

            if (subcategory.category.categoryId !== category.categoryId) {
                throw new Error('Subcategory does not belong to category');
            }
        }

        let tags: Tag[] = [];
        if (recurringExpense.tags) {
            tags = await Promise.all(
                recurringExpense.tags.map(async (tag) => {
                    const existingTag = await this._tagRepository.findOne({
                        where: {
                            tagId: tag.tagId
                        },
                        relations: ['account']
                    });

                    if (!existingTag) {
                        throw new Error('Tag not found');
                    }

                    if (existingTag.account.accountId !== accountId) {
                        throw new Error('Tag does not belong to account');
                    }

                    return existingTag;
                })
            );
        }

        const existingExpense = await this._recurringExpenseRepository.findOne({
            where: {
                recurringExpenseId: recurringExpense.expenseId
            },
            relations: [
                'category',
                'subcategory',
                'tags',
                'paymentMethod',
                'account'
            ]
        });

        let recurringExpenseEntity = new RecurringExpense();

        if (existingExpense) {
            if (existingExpense.account.accountId !== accountId) {
                throw new Error('Expense does not belong to account');
            }

            recurringExpenseEntity = existingExpense;
            recurringExpenseEntity.recurringExpenseId =
                recurringExpense.expenseId;
        }

        recurringExpenseEntity.name = recurringExpense.name ?? '-';
        recurringExpenseEntity.day =
            recurringExpense.day ?? new Date().getDate();
        recurringExpenseEntity.amountCents = recurringExpense.amountCents ?? 0;
        recurringExpenseEntity.split = recurringExpense.split;
        recurringExpenseEntity.paymentMethod = paymentMethod;
        recurringExpenseEntity.category = category;
        recurringExpenseEntity.subcategory = subcategory;
        recurringExpenseEntity.tags = tags;
        recurringExpenseEntity.account = account;

        return (
            await this._recurringExpenseRepository.save(recurringExpenseEntity)
        ).recurringExpenseId;
    }

    public async deleteRecurringExpense(
        accountId: string,
        recurringExpenseId: string
    ): Promise<void> {
        const recurringExpense = await this._recurringExpenseRepository.findOne(
            recurringExpenseId,
            {
                relations: ['account']
            }
        );

        if (!recurringExpense) {
            throw new Error('Expense not found');
        }

        if (recurringExpense.account.accountId !== accountId) {
            throw new Error('Expense does not belong to account');
        }

        await this._recurringExpenseRepository.delete(recurringExpenseId);
    }
}
