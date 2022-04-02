import { useApiList } from '@clemann-developments/common-endpoint';
import {
    ListRecurringExpensesRequest,
    ListRecurringExpensesResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';

export default function useListRecurringExpenses(
    initialRequest: ListRecurringExpensesRequest
) {
    return useApiList<
        ListRecurringExpensesRequest,
        ListRecurringExpensesResponse
    >(initialRequest, 'configuration/listRecurringExpenses');
}
