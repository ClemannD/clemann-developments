import { ExpenseDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { useEventBus } from '@clemann-developments/react/hooks/use-event-bus';
import { useEffect, useState } from 'react';
import { EventBusActionTypes } from '../../../constants/event-bus-action-types';
import styles from './expenses-table.module.scss';
import ExpenseAmountCell from './cells/amount-cell.component';
import ExpenseCategoryCell from './cells/category-cell.component';
import ExpenseControlsCell from './cells/controls-cell/controls-cell.component';
import ExpenseDateCell from './cells/date-cell.component';
import ExpenseItemCell from './cells/item-cell.component';
import ExpensePaymentMethodCell from './cells/payment-method-cell.component';
import ExpenseSplitCell from './cells/split-cell.component';
import ExpenseSubcategoryCell from './cells/subcategory-cell.component';
import ExpenseTagCell from './cells/tag-cell.component';
import { useExpenseRowKeyHandler } from './expense-table-row-key-handler.hook';

export default function ExpensesTableRow({
    expense,
    month,
    hideDelete,
    focused = false,
    clearOnSave = false,
    rowIndex,
    startNewExpense,
    saveExpense,
    deleteExpense
}: {
    expense?: ExpenseDto;
    month: number;
    hideDelete?: boolean;
    focused?: boolean;
    clearOnSave?: boolean;
    rowIndex?: number;
    startNewExpense?: (expense: ExpenseDto) => Promise<void>;
    saveExpense: (expense: ExpenseDto) => Promise<void>;
    deleteExpense: (expenseId: string) => Promise<void>;
}) {
    const saveChanges = async () => {
        if (isExpenseChanged(expense, newExpense)) {
            if (clearOnSave) {
                clearChanges();
            }
            await saveExpense(newExpense);
        }
    };

    const { handleKeyDownRow } = useExpenseRowKeyHandler(saveChanges);

    const [newExpense, setNewExpense] = useState<ExpenseDto>(expense);
    const [hasChanges, setHasChanges] = useState(false);

    const eventBus = useEventBus<EventBusActionTypes>();

    useEffect(() => {
        if (expense) {
            setHasChanges(isExpenseChanged(expense, newExpense));

            if (startNewExpense && isExpenseChanged(expense, newExpense)) {
                startNewExpense(newExpense);
            }
        }
    }, [newExpense, expense]);

    const updateNewExpense = (newValue: any, valueKey: string) => {
        setNewExpense((prevExpense) => ({
            ...prevExpense,
            [valueKey]: newValue
        }));
    };

    const isExpenseChanged = (
        expenseToCheck: ExpenseDto,
        newExpenseToCheck: ExpenseDto
    ) => {
        if (!expenseToCheck.tags) {
            expenseToCheck.tags = [];
        }
        const tagsAreChanged =
            !expenseToCheck.tags?.every((tag) =>
                newExpenseToCheck.tags?.find(
                    (newTag) => newTag.tagId === tag.tagId
                )
            ) ||
            !newExpenseToCheck.tags?.every((tag) =>
                expenseToCheck.tags?.find(
                    (newTag) => newTag.tagId === tag.tagId
                )
            );

        return (
            expenseToCheck?.expenseId !== newExpenseToCheck?.expenseId ||
            expenseToCheck?.name !== newExpenseToCheck?.name ||
            expenseToCheck?.category?.categoryId !==
                newExpenseToCheck?.category?.categoryId ||
            expenseToCheck?.subcategory?.subcategoryId !==
                newExpenseToCheck?.subcategory?.subcategoryId ||
            expenseToCheck?.amountCents !== newExpenseToCheck?.amountCents ||
            expenseToCheck?.day !== newExpenseToCheck?.day ||
            expenseToCheck?.paymentMethod?.paymentMethodId !==
                newExpenseToCheck?.paymentMethod?.paymentMethodId ||
            expenseToCheck?.notes !== newExpenseToCheck?.notes ||
            expenseToCheck.split !== newExpenseToCheck.split ||
            expenseToCheck.splitPaid !== newExpenseToCheck.splitPaid ||
            tagsAreChanged
        );
    };

    useEffect(() => {
        eventBus.addEventListener(
            EventBusActionTypes.SAVE_ALL_EXPENSES,
            saveChanges
        );
        return () => {
            eventBus.removeEventListener(
                EventBusActionTypes.SAVE_ALL_EXPENSES,
                saveChanges
            );
        };
    }, []);

    const clearChanges = () => {
        setNewExpense(expense);
        setHasChanges(false);
    };

    const handleDeleteExpense = async () => {
        setHasChanges(false);
        if (expense?.expenseId) {
            await deleteExpense(expense.expenseId);
        }
    };

    return (
        <tr
            className={`
                ${styles.expensesTableRow}
                ${hasChanges ? styles.hasChanges : ''}
            `}
            onKeyDown={handleKeyDownRow}
        >
            <>
                <ExpenseDateCell
                    day={newExpense.day}
                    month={month}
                    focused={focused}
                    rowIndex={rowIndex}
                    updateNewExpense={updateNewExpense}
                />
                <ExpenseItemCell
                    item={newExpense.name}
                    isRecurring={newExpense.isRecurring}
                    rowIndex={rowIndex}
                    updateNewExpense={updateNewExpense}
                />
                <ExpenseCategoryCell
                    category={newExpense.category}
                    rowIndex={rowIndex}
                    updateNewExpense={updateNewExpense}
                />
                <ExpenseSubcategoryCell
                    subcategory={newExpense.subcategory}
                    category={newExpense.category}
                    rowIndex={rowIndex}
                    updateNewExpense={updateNewExpense}
                />
                <ExpenseTagCell
                    tags={newExpense.tags}
                    rowIndex={rowIndex}
                    updateNewExpense={updateNewExpense}
                />
                <ExpenseSplitCell
                    split={newExpense.split}
                    splitPaid={newExpense.splitPaid}
                    rowIndex={rowIndex}
                    updateNewExpense={updateNewExpense}
                />
                <ExpensePaymentMethodCell
                    paymentMethod={newExpense.paymentMethod}
                    rowIndex={rowIndex}
                    updateNewExpense={updateNewExpense}
                />
                <ExpenseAmountCell
                    amountCents={newExpense.amountCents}
                    split={newExpense.split}
                    rowIndex={rowIndex}
                    updateNewExpense={updateNewExpense}
                />
                <ExpenseControlsCell
                    expense={newExpense}
                    hasChanges={hasChanges}
                    hideDelete={hideDelete}
                    rowIndex={rowIndex}
                    saveChanges={saveChanges}
                    clearChanges={clearChanges}
                    deleteExpense={handleDeleteExpense}
                ></ExpenseControlsCell>
            </>
        </tr>
    );
}
