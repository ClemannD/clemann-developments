import { PaginationAndSort } from '@clemann-developments/common-endpoint';
import {
    ExpenseDto,
    MonthDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { findPaginatedAndSort } from '@clemann-developments/node/typeorm/find-paginated-and-sort';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { Expense } from '../../entities/expense.entity';
import { Month } from '../../entities/month.entity';

@Injectable()
export class MonthService {
    constructor(
        @InjectRepository(Expense)
        private readonly _expenseRepository: Repository<Expense>,
        @InjectRepository(Account)
        private readonly _accountRepository: Repository<Account>,
        @InjectRepository(Month)
        private readonly _monthRepository: Repository<Month>
    ) {}

    public async getMonth(
        accountId: string,
        month: number,
        year: number
    ): Promise<MonthDto> {
        console.log('here');

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
        console.log('monthEntity', monthEntity);

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
        month: number,
        year: number
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
        const month = await this._monthRepository.findOne(monthId, {
            relations: ['account']
        });

        console.log('month', month);
        if (!month) {
            throw new Error('Month not found');
        }

        if (month.account.accountId !== accountId) {
            throw new Error('Month does not belong to account');
        }

        const expenses = await findPaginatedAndSort<Expense>(
            this._expenseRepository,
            paginationAndSort,
            null,
            'day',
            ['category', 'subcategory', 'tags']
        );
        console.log('expenses', expenses);

        const expenseDtos = expenses[0]?.map((expense) => ({
            expenseId: expense.expenseId,
            name: expense.name,
            day: expense.day,
            amountCents: expense.amountCents,
            split: expense.split,
            splitPaid: expense.splitPaid,
            notes: expense.notes,
            isRecurring: expense.isRecurring,
            category: {
                categoryId: expense.category.categoryId,
                name: expense.category.name,
                color: expense.category.color
            },
            subcategories: expense.category.subcategories.map(
                (subcategory) => ({
                    subcategoryId: subcategory.subcategoryId,
                    name: subcategory.name
                })
            ),
            tags: expense.tags.map((tag) => ({
                tagId: tag.tagId,
                name: tag.name
            }))
        }));

        return expenseDtos;
    }

    // public async getExpenses(
    //     accountId: number,
    //     month: number,
    //     year: number
    // ): Promise<MonthDto[]> {
    //     const expenses = await this._expenseRepository.find({
    //         where: {
    //             accountId,
    //             month,
    //             year
    //         }
    //     });

    //     return expenses.map(expense => {
    //         return {
    //             monthId: expense.monthId,
    //             year: expense.year,
    //             month: expense.month,
    //             expenses: [
    //                 {
    //                     expenseId: expense.expenseId,
    //                     name: expense.name,
    //                     day: expense.day,
    //                     amountCents: expense.amountCents,
    //                     split: expense.split,
    //                     splitPaid: expense.splitPaid,
    //                     notes: expense.notes,
    //                     isRecurring: expense.isRecurring,
    //                     category: {
    //                         categoryId: expense.categoryId,
    //                         name: expense.categoryName,
    //                         color: expense.categoryColor
    //                     },
    //                     tags: [
    //                         {
    //                             tagId: expense.tagId,
    //                             name: expense.tagName
    //                         }
    //                     ]
    //                 }
    //             ]
    //         };
    //     });

    // }
}
