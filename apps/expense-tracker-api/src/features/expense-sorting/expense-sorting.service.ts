import {
    PaginationAndSort,
    SortDirection
} from '@clemann-developments/common-endpoint';
import {
    ExpenseDto,
    RecurringExpenseDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpenseSortingService {
    public sortExpenses(
        expenses: ExpenseDto[] | RecurringExpenseDto[],
        paginationAndSort: PaginationAndSort
    ): ExpenseDto[] | RecurringExpenseDto[] {
        return expenses.sort((a, b) => {
            if (
                !paginationAndSort ||
                !paginationAndSort.sortColumn ||
                !paginationAndSort.sortDirection
            ) {
                return a.day - b.day;
            }

            if (
                paginationAndSort.sortColumn === 'day' &&
                paginationAndSort.sortDirection === SortDirection.Asc
            ) {
                return a.day - b.day;
            } else if (
                paginationAndSort.sortColumn === 'day' &&
                paginationAndSort.sortDirection === SortDirection.Desc
            ) {
                return b.day - a.day;
            } else if (
                paginationAndSort.sortColumn === 'amountCents' &&
                paginationAndSort.sortDirection === SortDirection.Asc
            ) {
                return b.amountCents - a.amountCents;
            } else if (
                paginationAndSort.sortColumn === 'amountCents' &&
                paginationAndSort.sortDirection === SortDirection.Desc
            ) {
                return a.amountCents - b.amountCents;
            } else if (
                paginationAndSort.sortColumn === 'split' &&
                paginationAndSort.sortDirection === SortDirection.Asc
            ) {
                return b.split - a.split;
            } else if (
                paginationAndSort.sortColumn === 'split' &&
                paginationAndSort.sortDirection === SortDirection.Desc
            ) {
                return a.split - b.split;
            } else if (
                paginationAndSort.sortColumn === 'name' &&
                paginationAndSort.sortDirection === SortDirection.Asc
            ) {
                return a.name.localeCompare(b.name);
            } else if (
                paginationAndSort.sortColumn === 'name' &&
                paginationAndSort.sortDirection === SortDirection.Desc
            ) {
                return b.name.localeCompare(a.name);
            } else if (
                paginationAndSort.sortColumn === 'paymentMethod' &&
                paginationAndSort.sortDirection === SortDirection.Asc
            ) {
                return (
                    a.paymentMethod?.name.localeCompare(
                        b.paymentMethod?.name
                    ) ?? 0
                );
            } else if (
                paginationAndSort.sortColumn === 'paymentMethod' &&
                paginationAndSort.sortDirection === SortDirection.Desc
            ) {
                return (
                    b.paymentMethod?.name.localeCompare(
                        a.paymentMethod?.name
                    ) ?? 0
                );
            } else if (
                paginationAndSort.sortColumn === 'category' &&
                paginationAndSort.sortDirection === SortDirection.Asc
            ) {
                return a.category?.name.localeCompare(b.category?.name) ?? 0;
            } else if (
                paginationAndSort.sortColumn === 'category' &&
                paginationAndSort.sortDirection === SortDirection.Desc
            ) {
                return b.category?.name.localeCompare(a.category?.name) ?? 0;
            } else {
                return a.day - b.day;
            }
        });
    }
}
