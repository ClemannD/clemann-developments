import {
    ListRequest,
    ListResponse,
    UseApiListResults
} from '@clemann-developments/common-endpoint';
import { ExpenseDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { Button } from '@clemann-developments/react/components/interaction/button';
import {
    ColumnHeader,
    Table
} from '@clemann-developments/react/components/tables';
import { Input } from '@clemann-developments/react/forms';
import { useEventBus } from '@clemann-developments/react/hooks/use-event-bus';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { EventBusActionTypes } from '../../../constants/event-bus-action-types';
import { useExpenseTableKeyHandler } from './expense-table-key-handler.hook';
import { ExpenseTableContext } from './expense-table.context';
import ExpensesTableRow from './expenses-table-row.component';
import styles from './expenses-table.module.scss';
import * as Yup from 'yup';

export default function ExpensesTable({
    listExpensesService,
    month,
    cachedExpenses,
    setCachedExpenses,
    showPasteSection = false,
    saveExpense,
    deleteExpense
}: {
    listExpensesService?: UseApiListResults<
        ListRequest,
        ListResponse<ExpenseDto>
    >;
    month: number;
    cachedExpenses: ExpenseDto[];
    setCachedExpenses: any;
    showPasteSection?: boolean;
    saveExpense: (expense: ExpenseDto) => Promise<void>;
    deleteExpense: (expenseId: string) => Promise<void>;
}) {
    const eventBus = useEventBus();
    const [newExpense, setNewExpense] = useState<ExpenseDto>(new ExpenseDto());

    const {
        focusedColumnIndex,
        focusedRowIndex,
        setFocusedColumnIndex,
        setFocusedRowIndex,
        handleKeyDownTable,
        focusCell
    } = useExpenseTableKeyHandler(cachedExpenses?.length);

    useEffect(() => {
        if (listExpensesService?.rows) {
            setCachedExpenses(listExpensesService.rows);
        }
    }, [listExpensesService?.rows]);

    const saveAll = () => {
        eventBus.dispatchEvent(EventBusActionTypes.SAVE_ALL_EXPENSES);
    };

    const addNewRowToCachedRows = (newRow: ExpenseDto) => {
        if (!newRow.amountCents) {
            newRow.amountCents = 0;
        }
        setCachedExpenses((prevRows: ExpenseDto[]) => [...prevRows, newRow]);
    };

    const saveExistingRowToCacheAndPropagate = async (expense: ExpenseDto) => {
        if (expense.amountCents === null) {
            expense.amountCents = 0;
        }
        setCachedExpenses((prevRows) =>
            prevRows.map((row) =>
                row.expenseId === expense.expenseId ? expense : row
            )
        );
        await saveExpense(expense);
    };

    const saveNewExpenseToCacheAndPropagate = async (
        newExpenseToSave: ExpenseDto
    ) => {
        addNewRowToCachedRows(newExpenseToSave);
        setNewExpense(new ExpenseDto());
        saveExpense(newExpenseToSave);
        document
            .getElementById(`expense-table-cell-${cachedExpenses?.length}-0`)
            ?.focus();
    };

    const deleteExpenseFromCacheAndPropagate = async (expenseId: string) => {
        setCachedExpenses((prevRows) =>
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
                isLoading={listExpensesService.apiService.isLoading}
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
                            sortKey="category"
                            listService={listExpensesService}
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
                            sortKey="split"
                            listService={listExpensesService}
                            border
                        ></ColumnHeader>
                        <ColumnHeader
                            width="15rem"
                            header="Payment Method"
                            sortKey="paymentMethod"
                            listService={listExpensesService}
                            border
                        ></ColumnHeader>
                        <ColumnHeader
                            width="20rem"
                            header="Amount"
                            sortKey="amountCents"
                            listService={listExpensesService}
                            alignRight
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
                    !listExpensesService.apiService.isLoading && (
                        <>
                            {cachedExpenses?.map(
                                (expense: ExpenseDto, rowIndex) => (
                                    <ExpensesTableRow
                                        key={
                                            expense.expenseId ||
                                            `${rowIndex}-${expense.name}-${expense.day}-${expense.amountCents}`
                                        }
                                        month={month}
                                        expense={expense}
                                        rowIndex={rowIndex}
                                        saveExpense={
                                            saveExistingRowToCacheAndPropagate
                                        }
                                        deleteExpense={
                                            deleteExpenseFromCacheAndPropagate
                                        }
                                    />
                                )
                            )}
                            <ExpensesTableRow
                                expense={newExpense}
                                month={month}
                                focused={true}
                                hideDelete={true}
                                clearOnSave={true}
                                rowIndex={cachedExpenses?.length}
                                saveExpense={saveNewExpenseToCacheAndPropagate}
                                deleteExpense={deleteExpense}
                            />
                        </>
                    )
                }
            ></Table>
            {showPasteSection && (
                <div className={styles.pasteExpenseSection}>
                    <h5
                        style={{
                            marginBottom: '1rem'
                        }}
                    >
                        Paste Shared Expenses
                    </h5>
                    <Formik
                        initialValues={{
                            expenseCsv: ''
                        }}
                        validationSchema={Yup.object({
                            expenseCsv: Yup.string()
                                .required('Required')
                                .matches(
                                    /([1-9]|[12][0-9]|3[01]), .{1,}, \d{0,1}, \d{1,}/,
                                    'Invalid format.'
                                )
                        })}
                        onSubmit={(values) => {
                            const splitExpenseCsv =
                                values.expenseCsv.split(', ');
                            const pastedExpense = new ExpenseDto();
                            pastedExpense.day = parseInt(splitExpenseCsv[0]);
                            pastedExpense.name = splitExpenseCsv[1];
                            pastedExpense.split =
                                parseInt(splitExpenseCsv[2]) || null;
                            pastedExpense.amountCents = parseInt(
                                splitExpenseCsv[3]
                            );

                            addNewRowToCachedRows(pastedExpense);
                            saveExpense(pastedExpense);
                        }}
                    >
                        <Form>
                            <div className={styles.pasteFormRow}>
                                <Input
                                    style={{
                                        marginRight: '2rem',
                                        width: '30rem'
                                    }}
                                    name="expenseCsv"
                                />
                                <Button type="submit">Create Expense</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            )}
        </ExpenseTableContext.Provider>
    );
}
