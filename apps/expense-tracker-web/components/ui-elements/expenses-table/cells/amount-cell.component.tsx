import styles from '../expenses-table.module.scss';
import CurrencyInput from 'react-currency-input-field';
import { useContext, useEffect, useRef, useState } from 'react';
import { ExpenseTableContext } from '../expense-table.context';

export default function ExpenseAmountCell({
    amountCents,
    split,
    rowIndex,
    updateNewExpense
}: {
    amountCents: number;
    split: number;
    rowIndex: number;
    updateNewExpense: (amountCents: number, valueKey: string) => void;
}) {
    const expenseTableContext = useContext(ExpenseTableContext);

    const shadowInput = useRef(null);
    const [value, setValue] = useState(
        amountCents ? `${amountCents / 100}` : ''
    );
    const [inputWidth, setInputWidth] = useState();
    const [inputFocused, setInputFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        shadowInput.current.innerText = `$${value}.00`;
    }, [value]);

    useEffect(() => {
        setValue(amountCents ? `${amountCents / 100}` : '');
    }, [amountCents]);

    useEffect(() => {
        const shadowInputWidth = shadowInput.current.clientWidth + 6;

        setInputWidth(shadowInputWidth + 5);
    }, [shadowInput?.current?.clientWidth]);

    const handleInputChange = (value: string) => {
        if (!value) {
            updateNewExpense(0, 'amountCents');
            setValue(`${0}`);
            return;
        }
        const newValueCents = parseFloat(value) * 100;

        updateNewExpense(parseInt(newValueCents.toFixed(0)), 'amountCents');
        setValue(value);
    };

    const handleFocus = () => {
        setInputFocused(true);
        expenseTableContext.setFocusedColumnIndex(8);
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
        if (event.key === 'Enter') {
            inputRef.current.value = '';
        }
    };

    return (
        <td
            className={`
                ${styles.expenseTableCell}
                ${inputFocused ? styles.focused : ''}
            `}
            onClick={() => {
                inputRef.current?.focus();
            }}
        >
            <div className={styles.amountCell}>
                {split && amountCents > 0 && (
                    <div className={styles.splitAmount}>
                        (${(amountCents / split / 100).toFixed(2)})
                    </div>
                )}
                <CurrencyInput
                    id={`expense-table-cell-${rowIndex}-8`}
                    style={{
                        width: `${inputWidth}px`
                    }}
                    intlConfig={{
                        locale: 'en-US',
                        currency: 'USD'
                    }}
                    ref={inputRef}
                    value={value}
                    decimalScale={2}
                    onFocus={handleFocus}
                    onBlur={() => setInputFocused(false)}
                    onValueChange={handleInputChange}
                    onKeyDown={onKeyDown}
                />
                <div className={styles.shadowInput} ref={shadowInput}>
                    $0.00
                </div>
            </div>
        </td>
    );
}
