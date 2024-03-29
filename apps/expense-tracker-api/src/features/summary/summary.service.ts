import {
    CategoryYearSummaryDto,
    TagYearSummaryDto,
    YearSummaryDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { Expense } from '../../entities/expense.entity';
import { Month } from '../../entities/month.entity';
import { ActiveOptionsService } from '../active-options/active-options.service';

@Injectable()
export class SummaryService {
    constructor(
        @InjectRepository(Account)
        private readonly _accountRepository: Repository<Account>,
        @InjectRepository(Expense)
        private readonly _expenseRepository: Repository<Expense>,
        @InjectRepository(Month)
        private readonly _monthRepository: Repository<Month>,
        private readonly _activeOptionsService: ActiveOptionsService
    ) {}

    public async getYearSummary(
        accountId: string,
        year: number
    ): Promise<YearSummaryDto> {
        const monthsForYear = await this._getMonthsForYear(accountId, year);
        const monthTotalsCents = this._getYearMonthTotalsCents(monthsForYear);
        const yearTotalCents = this._getYearTotalCents(monthsForYear);
        const categorySummaries = await this._getCategoryYearSummaries(
            monthsForYear,
            accountId
        );
        const tagSummaries = await this._getTagYearSummaries(
            monthsForYear,
            accountId
        );

        return {
            year,
            monthTotalsCents,
            yearTotalCents,
            categorySummaries,
            tagSummaries
        };
    }

    private _getYearMonthTotalsCents(months: Month[]): number[] {
        const monthTotalOrZero = (monthNumber: number): number => {
            return (
                months
                    .find((month) => month.month === monthNumber)
                    ?.expenses.reduce((acc, expense) => {
                        return acc + this._getExpenseCents(expense);
                    }, 0) || 0
            );
        };

        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(monthTotalOrZero);
    }

    private _getCategoryMonthTotalsCents(
        months: Month[],
        categoryId: string
    ): number[] {
        const monthTotalOrZero = (monthNumber: number): number => {
            return (
                months
                    .find((month) => month.month === monthNumber)
                    ?.expenses.filter(
                        (expense) => expense.category?.categoryId === categoryId
                    )
                    ?.reduce((acc, expense) => {
                        return acc + this._getExpenseCents(expense);
                    }, 0) ?? 0
            );
        };

        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(monthTotalOrZero);
    }

    private _getTagMonthTotalsCents(months: Month[], tagId: string): number[] {
        const monthTotalOrZero = (monthNumber: number): number => {
            return (
                months
                    .find((month) => month.month === monthNumber)
                    ?.expenses.filter((expense) =>
                        expense.tags?.some((tag) => tag.tagId === tagId)
                    )
                    ?.reduce((acc, expense) => {
                        return acc + this._getExpenseCents(expense);
                    }, 0) ?? 0
            );
        };

        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(monthTotalOrZero);
    }

    private _getSubcategoryMonthTotalsCents(
        months: Month[],
        subcategoryId: string
    ): number[] {
        const monthTotalOrZero = (monthNumber: number): number => {
            return (
                months
                    .find((month) => month.month === monthNumber)
                    ?.expenses.filter(
                        (expense) =>
                            expense.subcategory?.subcategoryId === subcategoryId
                    )
                    .reduce((acc, expense) => {
                        return acc + this._getExpenseCents(expense);
                    }, 0) ?? 0
            );
        };

        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(monthTotalOrZero);
    }

    private _getYearTotalCents(months: Month[]): number {
        return months.reduce((total, month) => {
            return (
                total +
                month.expenses.reduce((total, expense) => {
                    return total + this._getExpenseCents(expense);
                }, 0)
            );
        }, 0);
    }

    private async _getCategoryYearSummaries(
        months: Month[],
        accountId: string
    ): Promise<CategoryYearSummaryDto[]> {
        const activeCategories =
            await this._activeOptionsService.getActiveCategories(accountId);

        return activeCategories
            .map((category) => {
                const categoryMonthTotalsCents =
                    this._getCategoryMonthTotalsCents(
                        months,
                        category.categoryId
                    );

                return {
                    categoryId: category.categoryId,
                    name: category.name,
                    color: category.color,
                    totalCents: categoryMonthTotalsCents.reduce(
                        (total, monthTotal) => total + monthTotal,
                        0
                    ),
                    monthTotalsCents: categoryMonthTotalsCents,
                    subcategorySummaries: category.subcategories.map(
                        (subcategory) => {
                            const subcategoryMonthTotalsCents =
                                this._getSubcategoryMonthTotalsCents(
                                    months,
                                    subcategory.subcategoryId
                                );

                            return {
                                subcategoryId: subcategory.subcategoryId,
                                name: subcategory.name,
                                monthTotalsCents: subcategoryMonthTotalsCents,
                                totalCents: subcategoryMonthTotalsCents.reduce(
                                    (total, monthTotal) => total + monthTotal,
                                    0
                                )
                            };
                        }
                    )
                };
            })
            .sort((a, b) => b.totalCents - a.totalCents);
    }

    private async _getTagYearSummaries(
        months: Month[],
        accountId: string
    ): Promise<TagYearSummaryDto[]> {
        const activeTags = await this._activeOptionsService.getActiveTags(
            accountId
        );

        return activeTags
            .map((tag) => {
                const tagMonthTotalsCents = this._getTagMonthTotalsCents(
                    months,
                    tag.tagId
                );

                return {
                    tagId: tag.tagId,
                    name: tag.name,
                    totalCents: tagMonthTotalsCents.reduce(
                        (total, monthTotal) => total + monthTotal,
                        0
                    ),
                    monthTotalsCents: tagMonthTotalsCents
                };
            })
            .sort((a, b) => b.totalCents - a.totalCents);
    }

    private async _getMonthsForYear(
        accountId: string,
        year: number
    ): Promise<Month[]> {
        return (
            await this._monthRepository.find({
                where: {
                    account: {
                        accountId
                    },
                    year
                },
                relations: [
                    'expenses',
                    'expenses.category',
                    'expenses.subcategory',
                    'expenses.tags'
                ]
            })
        ).sort((a, b) => {
            return a.month - b.month;
        });
    }

    private _getExpenseCents(expense: Expense): number {
        return !expense.amountCents
            ? 0
            : expense.split
            ? expense.amountCents / expense.split
            : expense.amountCents;
    }
}
