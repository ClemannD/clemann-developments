import { useContext } from 'react';
import { ExpenseTableContext } from '../expense-table.context';
import styles from '../expenses-table.module.scss';

export default function ExpenseSplitCell({
    split,
    splitPaid,
    rowIndex,
    updateNewExpense
}: {
    split: number;
    splitPaid: boolean;
    rowIndex: number;
    updateNewExpense: (split: boolean | number, valueKey: string) => void;
}) {
    const expenseTableContext = useContext(ExpenseTableContext);

    const handleCellClick = () => {
        updateNewExpense(split ? (split === 4 ? null : split + 1) : 2, 'split');
    };

    const handlePaidClick = () => {
        if (!!split) {
            updateNewExpense(!splitPaid, 'splitPaid');
        }
    };

    const handleKeyDownSplitAmount = (
        event: React.KeyboardEvent<HTMLDivElement>
    ) => {
        if (event.key === 'Enter') {
            handleCellClick();
            event.stopPropagation();
        }
    };

    const handleKeyDownPaid = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handlePaidClick();
            event.stopPropagation();
        }
    };

    const handleFocusSplitAmount = () => {
        expenseTableContext.setFocusedColumnIndex(5);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };
    const handleFocusSplitPaid = () => {
        expenseTableContext.setFocusedColumnIndex(6);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };

    return (
        <td className={`${styles.expenseTableCell} ${styles.splitCell}`}>
            <div className={styles.splitCellWrapper}>
                <div
                    className={styles.splitAmountWrapper}
                    id={`expense-table-cell-${rowIndex}-5`}
                    tabIndex={0}
                    onKeyDown={handleKeyDownSplitAmount}
                    onClick={handleCellClick}
                    onFocus={handleFocusSplitAmount}
                >
                    {!!split && <div>1/{split} </div>}
                </div>
                <div
                    id={`expense-table-cell-${rowIndex}-6`}
                    className={styles.paidIconWrapper}
                    tabIndex={0}
                    onKeyDown={handleKeyDownPaid}
                    onClick={handlePaidClick}
                    onFocus={handleFocusSplitPaid}
                >
                    {!!split &&
                        (splitPaid ? (
                            <div className={styles.paidIcon}></div>
                        ) : (
                            <div
                                className={`${styles.paidIcon} ${styles.pending}`}
                            ></div>
                        ))}
                </div>
            </div>
        </td>
    );
}
