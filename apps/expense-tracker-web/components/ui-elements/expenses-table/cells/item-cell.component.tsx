import { RefreshIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useRef, useState } from 'react';
import { ExpenseTableContext } from '../expense-table.context';
import styles from '../expenses-table.module.scss';

export default function ExpenseItemCell({
    item,
    isRecurring,
    rowIndex,
    updateNewExpense
}: {
    item: string;
    isRecurring: boolean;
    rowIndex: number;
    updateNewExpense: (item: string, valueKey: string) => void;
}) {
    const expenseTableContext = useContext(ExpenseTableContext);

    const [value, setValue] = useState(item ?? '');
    const [inputFocused, setInputFocused] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValue(item ?? '');
    }, [item]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        updateNewExpense(newValue, 'name');
        setValue(newValue);
    };

    const handleFocus = () => {
        setInputFocused(true);
        expenseTableContext.setFocusedColumnIndex(1);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowLeft') {
            if (inputRef.current.selectionStart !== 0) {
                event.stopPropagation();
            }
        }
        if (event.key === 'ArrowRight') {
            if (
                inputRef.current.selectionStart !==
                inputRef.current.value.length
            ) {
                event.stopPropagation();
            }
        }
    };

    return (
        <td
            className={`
            ${styles.expenseTableCell}
            ${styles.itemCell}
            ${inputFocused ? styles.focused : ''}
        `}
        >
            {isRecurring && <RefreshIcon height={'1.5rem'} />}
            <input
                id={`expense-table-cell-${rowIndex}-1`}
                ref={inputRef}
                type="text"
                value={value}
                onKeyDown={onKeyDown}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={() => setInputFocused(false)}
            />
        </td>
    );
}
