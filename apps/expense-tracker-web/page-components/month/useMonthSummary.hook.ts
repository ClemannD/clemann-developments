import {
    CategorySummaryDto,
    ExpenseDto,
    MonthSummaryDto,
    SplitSummaryDto,
    SubcategorySummaryDto,
    TagSummaryDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { useEffect, useState } from 'react';

export default function useMonthSummary() {
    const [monthSummary, setMonthSummary] = useState<MonthSummaryDto>();
    const [summaryExpenses, setSummaryExpenses] = useState<ExpenseDto[]>([]);

    useEffect(() => {
        if (summaryExpenses) {
            setMonthSummary({
                thisMonthTotalCents:
                    _getTotalCentsFromExpenses(summaryExpenses),
                categorySummaries:
                    _getCategorySummariesFromExpenses(summaryExpenses),
                tagSummaries: _getTagSummariesFromExpenses(summaryExpenses),
                splitSummary: _getSplitSummaryFromExpenses(summaryExpenses)
            });
        } else {
            setMonthSummary(null);
        }
    }, [summaryExpenses]);

    return {
        monthSummary,
        setSummaryExpenses
    };
}

function _getTotalCentsFromExpenses(expenses: ExpenseDto[]): number {
    let totalCents = 0;

    expenses.forEach((expense) => {
        totalCents += _getNetExpenseAmount(expense);
    });

    return totalCents;
}

function _getCategorySummariesFromExpenses(
    expenses: ExpenseDto[]
): CategorySummaryDto[] {
    const categorySummaries: CategorySummaryDto[] = [];

    expenses.forEach((expense) => {
        if (expense.category) {
            const categorySummary = categorySummaries.find(
                (categorySummary) =>
                    categorySummary.categoryId === expense.category.categoryId
            );

            if (categorySummary) {
                categorySummary.totalCents += _getNetExpenseAmount(expense);
            } else {
                categorySummaries.push({
                    categoryId: expense.category.categoryId,
                    name: expense.category.name,
                    color: expense.category.color,
                    totalCents: _getNetExpenseAmount(expense)
                });
            }
        }
    });

    categorySummaries.forEach((categorySummary) => {
        categorySummary.subcategorySummaries =
            _getSubcategorySummariesFromExpensesForCategory(
                expenses,
                categorySummary.categoryId
            );
    });

    return categorySummaries.sort((a, b) => b.totalCents - a.totalCents);
}

function _getSubcategorySummariesFromExpensesForCategory(
    expenses: ExpenseDto[],
    categoryId: string
): SubcategorySummaryDto[] {
    const subcategorySummaries: SubcategorySummaryDto[] = [];

    expenses
        .filter((expense) => !!expense.category)
        .filter((expense) => expense.category.categoryId === categoryId)
        .forEach((expense) => {
            if (expense.subcategory) {
                const subcategorySummary = subcategorySummaries.find(
                    (subcategorySummary) =>
                        subcategorySummary.subcategoryId ===
                        expense.subcategory.subcategoryId
                );

                if (subcategorySummary) {
                    subcategorySummary.totalCents +=
                        _getNetExpenseAmount(expense);
                } else {
                    subcategorySummaries.push({
                        subcategoryId: expense.subcategory.subcategoryId,
                        name: expense.subcategory.name,
                        totalCents: _getNetExpenseAmount(expense)
                    });
                }
            }
        });

    return subcategorySummaries.sort((a, b) => b.totalCents - a.totalCents);
}

function _getTagSummariesFromExpenses(expenses: ExpenseDto[]): TagSummaryDto[] {
    const tagSummaries: TagSummaryDto[] = [];

    expenses.forEach((expense) => {
        expense.tags.forEach((tag) => {
            const tagSummary = tagSummaries.find(
                (tagSummary) => tagSummary.tagId === tag.tagId
            );

            if (tagSummary) {
                tagSummary.totalCents += _getNetExpenseAmount(expense);
            } else {
                tagSummaries.push({
                    tagId: tag.tagId,
                    name: tag.name,
                    totalCents: _getNetExpenseAmount(expense)
                });
            }
        });
    });

    return tagSummaries.sort((a, b) => b.totalCents - a.totalCents);
}

function _getNetExpenseAmount(expense: ExpenseDto): number {
    return expense.split
        ? expense.amountCents / expense.split
        : expense.amountCents;
}

function _getSplitSummaryFromExpenses(expenses: ExpenseDto[]): SplitSummaryDto {
    const splitSummary: SplitSummaryDto = {
        totalSplitAmountCents: expenses
            .filter((expense) => !!expense.split)
            .reduce(
                (total, expense) => total + _getNetExpenseAmount(expense),
                0
            ),
        totalPaidSplitAmountCents: expenses
            .filter((expense) => !!expense.split && expense.splitPaid)
            .reduce(
                (total, expense) => total + _getNetExpenseAmount(expense),
                0
            ),
        totalUnpaidSplitAmountCents: expenses
            .filter((expense) => !!expense.split && !expense.splitPaid)
            .reduce(
                (total, expense) => total + _getNetExpenseAmount(expense),
                0
            )
    };

    return splitSummary;
}
