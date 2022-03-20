import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import { MinusCircleIcon, XCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import { ExpenseTableContext } from '../expense-table.context';
import styles from '../expenses-table.module.scss';

export default function ExpenseControlsCell({
    hasChanges,
    hideDelete,
    rowIndex,
    saveChanges,
    clearChanges,
    deleteExpense
}: {
    hasChanges: boolean;
    hideDelete: boolean;
    rowIndex: number;
    saveChanges: () => Promise<void>;
    clearChanges: () => void;
    deleteExpense: () => Promise<void>;
}) {
    const expenseTableContext = useContext(ExpenseTableContext);

    const [saveButtonFocused, setSaveButtonFocused] = useState(false);
    const [deleteButtonFocused, setDeleteButtonFocused] = useState(false);

    const handleSaveClick = async () => {
        await saveChanges();
        setSaveButtonFocused(false);
        expenseTableContext.focusCell(rowIndex + 1, 0);
    };
    const handleClearClick = async () => {
        await clearChanges();
        setDeleteButtonFocused(false);
    };
    const handleDeleteClick = async () => {
        await deleteExpense();
        setDeleteButtonFocused(false);
    };

    const handleSaveFocus = () => {
        setSaveButtonFocused(true);
        expenseTableContext.setFocusedColumnIndex(9);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };
    const handleDeleteFocus = () => {
        setDeleteButtonFocused(true);
        expenseTableContext.setFocusedColumnIndex(10);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };

    return (
        <td className={`${styles.expenseTableCell} ${styles.controlsCell}`}>
            <div className={styles.controlsCellWrapper}>
                <div
                    className={`
                    ${styles.controlButtonWrapper}
                    ${saveButtonFocused ? styles.focused : ''}

                `}
                >
                    {hasChanges && (
                        <Button
                            id={`expense-table-cell-${rowIndex}-9`}
                            appearance={ButtonAppearance.Icon}
                            className={styles.noOutline}
                            clickHandler={handleSaveClick}
                            // style={{
                            //     marginRight: '1rem'
                            // }}
                            onFocus={handleSaveFocus}
                            onBlur={() => setSaveButtonFocused(false)}
                        >
                            <CheckCircleIcon height={'2rem'} />
                        </Button>
                    )}
                </div>

                <div
                    className={`
                    ${styles.controlButtonWrapper}
                    ${deleteButtonFocused ? styles.focused : ''}
                `}
                >
                    {hasChanges ? (
                        <Button
                            id={`expense-table-cell-${rowIndex}-10`}
                            appearance={ButtonAppearance.Icon}
                            clickHandler={handleClearClick}
                            className={styles.noOutline}
                            onFocus={handleDeleteFocus}
                            onBlur={() => setDeleteButtonFocused(false)}
                        >
                            <MinusCircleIcon />
                        </Button>
                    ) : (
                        !hideDelete && (
                            <Button
                                id={`expense-table-cell-${rowIndex}-10`}
                                appearance={ButtonAppearance.Icon}
                                clickHandler={handleDeleteClick}
                                className={styles.noOutline}
                                style={{
                                    color: '#f44336',
                                    opacity: 0.5
                                }}
                                onFocus={handleDeleteFocus}
                                onBlur={() => setDeleteButtonFocused(false)}
                            >
                                <XIcon />
                            </Button>
                        )
                    )}
                </div>
            </div>
        </td>
    );
}
