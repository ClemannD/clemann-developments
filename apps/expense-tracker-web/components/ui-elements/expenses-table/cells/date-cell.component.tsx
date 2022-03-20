import { useContext, useEffect, useRef, useState } from 'react';
import { ExpenseTableContext } from '../expense-table.context';
import styles from '../expenses-table.module.scss';

export default function ExpenseDateCell({
    day,
    month,
    focused = false,
    rowIndex,
    updateNewExpense
}: {
    day: number;
    month: number;
    focused?: boolean;
    rowIndex: number;
    updateNewExpense: (day: number, valueKey: string) => void;
}) {
    const expenseTableContext = useContext(ExpenseTableContext);

    const [value, setValue] = useState(`${day ?? ''}`);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        setValue(`${day ?? ''}`);
    }, [day]);

    useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
        }
    }, [focused]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === '') {
            setValue('');
            return;
        }

        const newValue = parseInt(event.target.value);

        if (newValue === 0) {
            setValue('');
            return;
        }

        if (newValue < 1 || newValue > 31 || newValue === 0) {
            return;
        }

        updateNewExpense(newValue, 'day');
        setValue(`${newValue}`);
    };

    const handleFocus = () => {
        setInputFocused(true);
        expenseTableContext.setFocusedColumnIndex(0);
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
                ${styles.dateCell}
                ${inputFocused ? styles.focused : ''}
            `}
        >
            {month}/
            <input
                id={`expense-table-cell-${rowIndex}-0`}
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={() => setInputFocused(false)}
                onKeyDown={onKeyDown}
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }}
            />
        </td>
    );
}
