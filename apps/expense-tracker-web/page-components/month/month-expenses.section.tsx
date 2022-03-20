import {
    ExpenseDto,
    MonthDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import useCreateOrUpdateExpense from '../../api-services/month/createOrUpdateExpense.service';
import useDeleteExpense from '../../api-services/month/deleteExpense.service';
import useListMonthExpenses from '../../api-services/month/listMonthExpenses.service';
import ExpensesTable from '../../components/ui-elements/expenses-table/expenses-table.component';
import styles from './month.module.scss';

export default function MonthExpensesSection({
    monthDto
}: {
    monthDto: MonthDto;
}) {
    const listMonthExpensesService = useListMonthExpenses({
        monthId: monthDto.monthId
    });
    const createOrUpdateExpenseService = useCreateOrUpdateExpense();
    const deleteExpenseService = useDeleteExpense();

    const saveExpense = async (expense: ExpenseDto) => {
        const response = await createOrUpdateExpenseService.mutateAsync({
            expense,
            monthId: monthDto.monthId
        });
        expense.expenseId = response.expenseId;
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
                saveExpense={saveExpense}
                deleteExpense={deleteExpense}
            ></ExpensesTable>
        </div>
    );
}
