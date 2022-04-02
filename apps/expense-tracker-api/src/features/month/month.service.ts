import {
    PaginationAndSort,
    SortDirection
} from '@clemann-developments/common-endpoint';
import {
    ExpenseDto,
    MonthDto,
    MonthSummaryDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { findPaginatedAndSort } from '@clemann-developments/node/typeorm/find-paginated-and-sort';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { Category } from '../../entities/category.entity';
import { Expense } from '../../entities/expense.entity';
import { Month } from '../../entities/month.entity';
import { PaymentMethod } from '../../entities/payment-method.entity';
import { Subcategory } from '../../entities/subcategory.entity';
import { Tag } from '../../entities/tag.entity';
import { ExpenseSortingService } from '../expense-sorting/expense-sorting.service';

@Injectable()
export class MonthService {
    constructor(
        @InjectRepository(Expense)
        private readonly _expenseRepository: Repository<Expense>,
        @InjectRepository(Account)
        private readonly _accountRepository: Repository<Account>,
        @InjectRepository(Month)
        private readonly _monthRepository: Repository<Month>,
        @InjectRepository(Category)
        private readonly _categoryRepository: Repository<Category>,
        @InjectRepository(Subcategory)
        private readonly _subcategoryRepository: Repository<Subcategory>,
        @InjectRepository(Tag)
        private readonly _tagRepository: Repository<Tag>,
        @InjectRepository(PaymentMethod)
        private readonly _paymentMethodRepository: Repository<PaymentMethod>,

        private _expenseSortingService: ExpenseSortingService
    ) {}

    public async getMonth(
        accountId: string,
        year: number,
        month: number
    ): Promise<MonthDto> {
        const monthEntity = await this._monthRepository.findOne({
            relations: ['account'],
            where: {
                account: {
                    accountId
                },
                month,
                year
            }
        });

        if (!monthEntity) {
            return null;
        }

        return {
            monthId: monthEntity.monthId,
            month: monthEntity.month,
            year: monthEntity.year
        };
    }

    public async createMonth(
        accountId: string,
        year: number,
        month: number
    ): Promise<void> {
        const account = await this._accountRepository.findOne({
            where: {
                accountId
            }
        });

        if (!account) {
            throw new Error('Account not found');
        }

        const existingMonth = await this.getMonth(accountId, month, year);

        if (existingMonth) {
            throw new Error('Month already exists');
        }

        const monthEntity = new Month();
        monthEntity.account = account;
        monthEntity.month = month;
        monthEntity.year = year;

        await this._monthRepository.save(monthEntity);
    }

    public async listMonthExpenses(
        accountId: string,
        monthId: string,
        paginationAndSort: PaginationAndSort
    ): Promise<ExpenseDto[]> {
        if (!monthId) {
            return [];
        }

        const month = await this._monthRepository.findOne(monthId, {
            relations: [
                'account',
                'expenses',
                'expenses.category',
                'expenses.subcategory',
                'expenses.tags',
                'expenses.paymentMethod'
            ]
        });

        if (!month) {
            throw new Error('Month not found');
        }

        if (month.account.accountId !== accountId) {
            throw new Error('Month does not belong to account');
        }

        const expenses = month.expenses;

        const expenseDtos: ExpenseDto[] = expenses?.map((expense) => ({
            expenseId: expense.expenseId,
            name: expense.name,
            day: expense.day,
            amountCents: expense.amountCents,
            split: expense.split,
            splitPaid: expense.splitPaid,
            notes: expense.notes,
            isRecurring: expense.isRecurring,
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
        ) as ExpenseDto[];
    }

    public async createOrUpdateExpense(
        accountId: string,
        monthId: string,
        expense: ExpenseDto
    ): Promise<string> {
        const month = await this._monthRepository.findOne(monthId, {
            relations: ['account']
        });

        if (!month) {
            throw new Error('Month not found');
        }

        if (month.account.accountId !== accountId) {
            throw new Error('Month does not belong to account');
        }

        let paymentMethod: PaymentMethod;
        if (expense.paymentMethod) {
            paymentMethod = await this._paymentMethodRepository.findOne({
                where: {
                    paymentMethodId: expense.paymentMethod.paymentMethodId
                }
            });
            if (!paymentMethod) {
                throw new Error('Payment method not found');
            }
        }

        let category: Category;
        if (expense.category) {
            category = await this._categoryRepository.findOne({
                where: {
                    categoryId: expense.category.categoryId
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
        if (expense.subcategory) {
            subcategory = await this._subcategoryRepository.findOne({
                where: {
                    subcategoryId: expense.subcategory.subcategoryId
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
        if (expense.tags) {
            tags = await Promise.all(
                expense.tags.map(async (tag) => {
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

        const existingExpense = await this._expenseRepository.findOne({
            where: {
                expenseId: expense.expenseId
            },
            relations: [
                'category',
                'subcategory',
                'tags',
                'month',
                'month.account'
            ]
        });

        let expenseEntity = new Expense();

        if (existingExpense) {
            if (existingExpense.month.account.accountId !== accountId) {
                throw new Error('Expense does not belong to account');
            }

            expenseEntity = existingExpense;
            expenseEntity.expenseId = expense.expenseId;
        }

        expenseEntity.name = expense.name ?? '-';
        expenseEntity.day = expense.day ?? new Date().getDate();
        expenseEntity.amountCents = expense.amountCents ?? 0;
        expenseEntity.split = expense.split;
        expenseEntity.splitPaid = expense.splitPaid;
        expenseEntity.notes = expense.notes;
        expenseEntity.isRecurring = expense.isRecurring;
        expenseEntity.paymentMethod = paymentMethod;
        expenseEntity.category = category;
        expenseEntity.subcategory = subcategory;
        expenseEntity.tags = tags;
        expenseEntity.month = month;

        return (await this._expenseRepository.save(expenseEntity)).expenseId;
    }

    public async deleteExpense(
        accountId: string,
        expenseId: string
    ): Promise<void> {
        const expense = await this._expenseRepository.findOne(expenseId, {
            relations: ['month', 'month.account']
        });

        if (!expense) {
            throw new Error('Expense not found');
        }

        if (expense.month.account.accountId !== accountId) {
            throw new Error('Expense does not belong to account');
        }

        await this._expenseRepository.delete(expenseId);
    }
}
