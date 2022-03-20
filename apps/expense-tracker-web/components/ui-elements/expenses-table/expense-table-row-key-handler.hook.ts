import { useContext } from 'react';
import { ExpenseTableContext } from './expense-table.context';

export function useExpenseRowKeyHandler(saveChanges: () => Promise<void>) {
    const expenseTableContext = useContext(ExpenseTableContext);

    const handleKeyDownRow = async (
        event: React.KeyboardEvent<HTMLTableRowElement>
    ) => {
        if (event.key === 'Enter') {
            await saveChanges();
            expenseTableContext.focusCell(
                expenseTableContext.focusedRowIndex + 1,
                expenseTableContext.focusedColumnIndex
            );
        }
    };

    return {
        handleKeyDownRow
    };
}
