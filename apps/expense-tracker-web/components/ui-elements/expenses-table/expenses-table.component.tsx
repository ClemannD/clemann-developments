import {
    ListRequest,
    ListResponse,
    UseApiListResults
} from '@clemann-developments/common-endpoint';
import { ExpenseDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import {
    ColumnHeader,
    Table
} from '@clemann-developments/react/components/tables';
import { useEventBus } from '@clemann-developments/react/hooks/use-event-bus';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { EventBusActionTypes } from '../../../constants/event-bus-action-types';
import { useExpenseTableKeyHandler } from './expense-table-key-handler.hook';
import { ExpenseTableContext } from './expense-table.context';
import ExpensesTableRow from './expenses-table-row.component';
import styles from './expenses-table.module.scss';

export default function ExpensesTable({
    listExpensesService,
    month,
    saveExpense,
    deleteExpense
}: {
    listExpensesService?: UseApiListResults<
        ListRequest,
        ListResponse<ExpenseDto>
    >;
    month: number;
    saveExpense: (expense: ExpenseDto) => Promise<void>;
    deleteExpense: (expenseId: string) => Promise<void>;
}) {
    const eventBus = useEventBus();
    const [cachedRows, setCachedRows] = useState<ExpenseDto[]>([]);
    const [newExpense, setNewExpense] = useState<ExpenseDto>(new ExpenseDto());

    const {
        focusedColumnIndex,
        focusedRowIndex,
        setFocusedColumnIndex,
        setFocusedRowIndex,
        handleKeyDownTable,
        focusCell
    } = useExpenseTableKeyHandler(cachedRows.length);

    useEffect(() => {
        if (listExpensesService?.rows) {
            setCachedRows(listExpensesService.rows);
        }
    }, [listExpensesService?.rows]);

    const saveAll = () => {
        eventBus.dispatchEvent(EventBusActionTypes.SAVE_ALL_EXPENSES);
    };

    const addNewRowToCachedRows = (newRow: ExpenseDto) => {
        setCachedRows((prevRows) => [...prevRows, newRow]);
    };

    const saveExistingRowToCacheAndPropagate = async (expense: ExpenseDto) => {
        setCachedRows((prevRows) =>
            prevRows.map((row) =>
                row.expenseId === expense.expenseId ? expense : row
            )
        );
        await saveExpense(expense);
    };

    const saveNewExpenseToCacheAndPropagate = async (
        newExpense: ExpenseDto
    ) => {
        addNewRowToCachedRows(newExpense);
        setNewExpense(new ExpenseDto());
        saveExpense(newExpense);
        document
            .getElementById(`expense-table-cell-${cachedRows.length}-0`)
            ?.focus();
    };

    const deleteExpenseFromCacheAndPropagate = async (expenseId: string) => {
        setCachedRows((prevRows) =>
            prevRows.filter((row) => row.expenseId !== expenseId)
        );
        await deleteExpense(expenseId);
    };

    return (
        <ExpenseTableContext.Provider
            value={{
                focusedColumnIndex,
                focusedRowIndex,
                setFocusedColumnIndex,
                setFocusedRowIndex,
                focusCell
            }}
        >
            <Table
                className={styles.expensesTable}
                onKeyDown={handleKeyDownTable}
                headers={
                    <>
                        <ColumnHeader
                            width="6rem"
                            header="Date"
                            sortKey="day"
                            listService={listExpensesService}
                            border
                        ></ColumnHeader>
                        <ColumnHeader
                            width="30rem"
                            header="Item"
                            sortKey="name"
                            listService={listExpensesService}
                            border
                        ></ColumnHeader>
                        <ColumnHeader
                            width="10rem"
                            header="Category"
                            border
                        ></ColumnHeader>
                        <ColumnHeader
                            width="10rem"
                            header="Subcategory"
                            border
                        ></ColumnHeader>
                        <ColumnHeader
                            width="15rem"
                            header="Tags"
                            border
                        ></ColumnHeader>
                        <ColumnHeader
                            width="7rem"
                            header="Split"
                            border
                        ></ColumnHeader>
                        <ColumnHeader
                            width="15rem"
                            header="Payment Method"
                            border
                        ></ColumnHeader>
                        <ColumnHeader
                            width="20rem"
                            header="Amount"
                            border
                        ></ColumnHeader>
                        <ColumnHeader width="6.3rem" border>
                            {/* <Button
                                appearance={ButtonAppearance.Icon}
                                clickHandler={saveAll}
                            >
                                <CheckCircleIcon />
                            </Button> */}
                        </ColumnHeader>
                    </>
                }
                rows={
                    <>
                        {cachedRows.map((expense: ExpenseDto, rowIndex) => (
                            <ExpensesTableRow
                                key={
                                    expense.expenseId ||
                                    `${rowIndex}-${expense.name}-${expense.day}-${expense.amountCents}`
                                }
                                month={month}
                                expense={expense}
                                rowIndex={rowIndex}
                                saveExpense={saveExistingRowToCacheAndPropagate}
                                deleteExpense={
                                    deleteExpenseFromCacheAndPropagate
                                }
                            />
                        ))}
                        <ExpensesTableRow
                            expense={newExpense}
                            month={month}
                            focused={true}
                            hideDelete={true}
                            clearOnSave={true}
                            rowIndex={cachedRows.length}
                            saveExpense={saveNewExpenseToCacheAndPropagate}
                            deleteExpense={deleteExpense}
                        />
                    </>
                }
            ></Table>
        </ExpenseTableContext.Provider>
    );
}
