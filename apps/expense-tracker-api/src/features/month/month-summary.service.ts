import {
    CategorySummaryDto,
    MonthSummaryDto,
    SubcategorySummaryDto,
    TagSummaryDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { Expense } from '../../entities/expense.entity';
import { Month } from '../../entities/month.entity';
import { Subcategory } from '../../entities/subcategory.entity';
import { Tag } from '../../entities/tag.entity';

@Injectable()
export class MonthSummaryService {
    constructor(
        @InjectRepository(Month)
        private readonly _monthRepository: Repository<Month>
    ) {}

    public async getMonthSummary(
        accountId: string,
        monthId: string
    ): Promise<MonthSummaryDto> {
        const month = await this._monthRepository.findOne(monthId, {
            relations: [
                'account',
                'expenses',
                'expenses.category',
                'expenses.subcategory',
                'expenses.tags'
            ]
        });

        if (!month) {
            throw new Error('Month not found');
        }

        if (month.account.accountId !== accountId) {
            throw new Error('Month does not belong to account');
        }

        const monthSummaryDto: MonthSummaryDto = {
            thisMonthTotalCents: this._getTotalCentsFromExpenses(
                month.expenses
            ),
            categorySummaries: this._getCategorySummariesFromExpenses(
                month.expenses
            ),
            tagSummaries: this._getTagSummariesFromExpenses(month.expenses)
        };

        return monthSummaryDto;
    }

    private _getTotalCentsFromExpenses(expenses: Expense[]): number {
        let totalCents = 0;

        expenses.forEach((expense) => {
            totalCents += expense.amountCents;
        });

        return totalCents;
    }

    private _getCategorySummariesFromExpenses(
        expenses: Expense[]
    ): CategorySummaryDto[] {
        const categorySummaries: CategorySummaryDto[] = [];

        expenses.forEach((expense) => {
            const categorySummary = categorySummaries.find(
                (categorySummary) =>
                    categorySummary.categoryId === expense.category.categoryId
            );

            if (categorySummary) {
                categorySummary.totalCents += expense.amountCents;
            } else {
                categorySummaries.push({
                    categoryId: expense.category.categoryId,
                    name: expense.category.name,
                    color: expense.category.color,
                    totalCents: expense.amountCents
                });
            }
        });

        categorySummaries.forEach((categorySummary) => {
            categorySummary.subcategorySummaries =
                this._getSubcategorySummariesFromExpensesForCategory(
                    expenses,
                    categorySummary.categoryId
                );
        });

        return categorySummaries;
    }

    private _getSubcategorySummariesFromExpensesForCategory(
        expenses: Expense[],
        categoryId: string
    ): SubcategorySummaryDto[] {
        const subcategorySummaries: SubcategorySummaryDto[] = [];

        expenses
            .filter((expense) => expense.category.categoryId === categoryId)
            .forEach((expense) => {
                const subcategorySummary = subcategorySummaries.find(
                    (subcategorySummary) =>
                        subcategorySummary.subcategoryId ===
                        expense.subcategory.subcategoryId
                );

                if (subcategorySummary) {
                    subcategorySummary.totalCents += expense.amountCents;
                } else {
                    subcategorySummaries.push({
                        subcategoryId: expense.subcategory.subcategoryId,
                        name: expense.subcategory.name,
                        totalCents: expense.amountCents
                    });
                }
            });

        return subcategorySummaries;
    }

    private _getTagSummariesFromExpenses(expenses: Expense[]): TagSummaryDto[] {
        const tagSummaries: TagSummaryDto[] = [];

        expenses.forEach((expense) => {
            expense.tags.forEach((tag) => {
                const tagSummary = tagSummaries.find(
                    (tagSummary) => tagSummary.tagId === tag.tagId
                );

                if (tagSummary) {
                    tagSummary.totalCents += expense.amountCents;
                } else {
                    tagSummaries.push({
                        tagId: tag.tagId,
                        name: tag.name,
                        totalCents: expense.amountCents
                    });
                }
            });
        });

        return tagSummaries;
    }
}
