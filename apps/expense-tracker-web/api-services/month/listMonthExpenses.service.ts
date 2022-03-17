import { useApiList } from '@clemann-developments/common-endpoint';
import {
    ListMonthExpensesRequest,
    ListMonthExpensesResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';

export default function useListMonthExpenses(
    initialRequest: ListMonthExpensesRequest
) {
    return useApiList<ListMonthExpensesRequest, ListMonthExpensesResponse>(
        initialRequest,
        'month/listMonthExpenses'
    );
}
