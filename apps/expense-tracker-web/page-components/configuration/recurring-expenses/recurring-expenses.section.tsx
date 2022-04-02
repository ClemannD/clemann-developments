import { RecurringExpenseDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { useEventBus } from '@clemann-developments/react/hooks/use-event-bus';
import { useState } from 'react';
import useGetActiveOptions from '../../../api-services/active-options/getActiveOptions.service';
import useCreateOrUpdateRecurringExpense from '../../../api-services/configuration/recurring-expenses/createOrUpdateRecurringExpense.service';
import useDeleteRecurringExpense from '../../../api-services/configuration/recurring-expenses/deleteRecurringExpense.service';
import useListRecurringExpenses from '../../../api-services/configuration/recurring-expenses/listRecurringExpenses.service';
import ExpensesTable from '../../../components/ui-elements/expenses-table/expenses-table.component';
import { EventBusActionTypes } from '../../../constants/event-bus-action-types';
import ActiveOptionsContext from '../../../context/active-options.context';
import styles from './recurring-expenses.module.scss';

export default function ConfigurationRecurringExpensesSection() {
    const eventBus = useEventBus();

    const listRecurringExpensesService = useListRecurringExpenses({});
    const createOrUpdateRecurringExpenseService =
        useCreateOrUpdateRecurringExpense();
    const deleteRecurringExpenseService = useDeleteRecurringExpense();
    const getActiveOptionsService = useGetActiveOptions();

    const [cachedRecurringExpenses, setCachedRecurringExpenses] =
        useState<RecurringExpenseDto[]>(null);

    const saveExpense = async (recurringExpense: RecurringExpenseDto) => {
        const response =
            await createOrUpdateRecurringExpenseService.mutateAsync({
                recurringExpense
            });
        recurringExpense.expenseId = response.recurringExpenseId;
        eventBus.dispatchEvent(EventBusActionTypes.EXPENSE_SAVED);
    };

    const deleteExpense = async (recurringExpenseId: string) => {
        await deleteRecurringExpenseService.mutateAsync({
            recurringExpenseId
        });
    };

    const fetchActiveOptions = () => {
        getActiveOptionsService.mutate({});
    };

    return (
        <ActiveOptionsContext.Provider
            value={{
                activeCategories: getActiveOptionsService.data?.categories,
                activeTags: getActiveOptionsService.data?.tags,
                activePaymentMethods:
                    getActiveOptionsService.data?.paymentMethods,
                fetchActiveOptions: fetchActiveOptions
            }}
        >
            <div className={styles.recurringExpensesSection}>
                <h3>Recurring Expenses</h3>
                <p
                    className="large"
                    style={{
                        marginBottom: '1rem'
                    }}
                >
                    The expenses listed here will automatically be added to all
                    future months
                </p>

                <ExpensesTable
                    listExpensesService={listRecurringExpensesService}
                    cachedExpenses={cachedRecurringExpenses}
                    setCachedExpenses={setCachedRecurringExpenses}
                    saveExpense={saveExpense}
                    deleteExpense={deleteExpense}
                    month={1}
                ></ExpensesTable>
            </div>
        </ActiveOptionsContext.Provider>
    );
}
