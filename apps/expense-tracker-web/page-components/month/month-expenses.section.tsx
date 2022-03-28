import { ExpenseDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { useEventBus } from '@clemann-developments/react/hooks/use-event-bus';
import { useContext, useEffect, useState } from 'react';
import useCreateOrUpdateExpense from '../../api-services/month/createOrUpdateExpense.service';
import useDeleteExpense from '../../api-services/month/deleteExpense.service';
import useListMonthExpenses from '../../api-services/month/listMonthExpenses.service';
import ExpensesTable from '../../components/ui-elements/expenses-table/expenses-table.component';
import { EventBusActionTypes } from '../../constants/event-bus-action-types';
import { MonthPageContext } from './month-page.context';
import styles from './month.module.scss';

export default function MonthExpensesSection({}: {}) {
    const eventBus = useEventBus();
    const { monthDto, setSummaryExpenses } = useContext(MonthPageContext);

    const listMonthExpensesService = useListMonthExpenses({
        monthId: monthDto.monthId
    });
    const createOrUpdateExpenseService = useCreateOrUpdateExpense();
    const deleteExpenseService = useDeleteExpense();

    const [cachedExpenses, setCachedExpenses] = useState<ExpenseDto[]>(null);

    useEffect(() => {
        setSummaryExpenses(cachedExpenses);
    }, [cachedExpenses]);

    const saveExpense = async (expense: ExpenseDto) => {
        const response = await createOrUpdateExpenseService.mutateAsync({
            expense,
            monthId: monthDto.monthId
        });
        expense.expenseId = response.expenseId;
        eventBus.dispatchEvent(EventBusActionTypes.EXPENSE_SAVED);
    };
    const deleteExpense = async (expenseId: string) => {
        await deleteExpenseService.mutateAsync({
            expenseId
        });
    };

    return (
        <div className={styles.monthExpensesTable}>
            <ExpensesTable
                listExpensesService={listMonthExpensesService}
                month={monthDto.month}
                cachedExpenses={cachedExpenses}
                setCachedExpenses={setCachedExpenses}
                saveExpense={saveExpense}
                deleteExpense={deleteExpense}
            ></ExpensesTable>
        </div>
    );
}
