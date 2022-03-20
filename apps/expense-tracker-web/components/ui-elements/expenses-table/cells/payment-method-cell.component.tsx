import {
    ActivePaymentMethodDto,
    ExpensePaymentMethodDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useContext, useEffect, useRef, useState } from 'react';
import ActiveOptionsContext from '../../../../context/active-options.context';
import { ExpenseTableContext } from '../expense-table.context';
import styles from '../expenses-table.module.scss';

export default function ExpensePaymentMethodCell({
    paymentMethod,
    rowIndex,
    updateNewExpense
}: {
    paymentMethod: ExpensePaymentMethodDto;
    rowIndex: number;
    updateNewExpense: (
        paymentMethod: ExpensePaymentMethodDto,
        valueKey: string
    ) => void;
}) {
    const expenseTableContext = useContext(ExpenseTableContext);
    const { activePaymentMethods } = useContext(ActiveOptionsContext);

    const [isEditingPaymentMethod, setIsEditingPaymentMethod] = useState(false);
    const dropdown = useRef(null);
    const cell = useRef(null);

    useEffect(() => {
        if (isEditingPaymentMethod) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditingPaymentMethod]);

    const handleClickOutside = (e: { target: any }) => {
        if (
            dropdown?.current?.contains(e.target) ||
            cell?.current?.contains(e.target)
        ) {
            return;
        }
        setIsEditingPaymentMethod(false);
    };

    const handlePaymentMethodSelect = (
        activePaymentMethod: ActivePaymentMethodDto
    ) => {
        if (activePaymentMethod === null) {
            updateNewExpense(null, 'paymentMethod');
            setIsEditingPaymentMethod(false);
        } else {
            updateNewExpense(
                {
                    paymentMethodId: activePaymentMethod.paymentMethodId,
                    name: activePaymentMethod.name
                },
                'paymentMethod'
            );
        }
        expenseTableContext.focusCell(rowIndex, 8);

        setIsEditingPaymentMethod(false);
    };

    const handleKeyDownCell = (
        event: React.KeyboardEvent<HTMLTableCellElement>
    ) => {
        if (event.key === 'Enter') {
            setIsEditingPaymentMethod(true);
            event.stopPropagation();
        }

        if (event.key === 'ArrowDown' && isEditingPaymentMethod) {
            document.getElementById(`payment-method-pill-0`)?.focus();
            event.stopPropagation();
        }

        if (event.key === 'ArrowUp' && isEditingPaymentMethod) {
            setIsEditingPaymentMethod(false);
            expenseTableContext.focusCell(rowIndex, 7);
            event.stopPropagation();
        }

        if (
            (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
            isEditingPaymentMethod
        ) {
            setIsEditingPaymentMethod(false);
        }
    };
    const handleKeyDownPill = (
        event: React.KeyboardEvent<HTMLDivElement>,
        activePaymentMethod: ActivePaymentMethodDto,
        index: number
    ) => {
        if (event.key === 'Tab' && index === 9999) {
            setIsEditingPaymentMethod(false);
        }

        if (event.key === 'Enter') {
            handlePaymentMethodSelect(activePaymentMethod);
            event.stopPropagation();
        }
        if (event.key === 'Escape') {
            setIsEditingPaymentMethod(false);
            event.stopPropagation();
        }

        if (event.key === 'ArrowDown') {
            if (index === 9999) {
                document.getElementById(`payment-method-pill-0`)?.focus();
            } else if (index < activePaymentMethods.length - 1) {
                document
                    .getElementById(`payment-method-pill-${index + 1}`)
                    ?.focus();
            } else {
                document.getElementById(`payment-method-pill-none`)?.focus();
            }
            event.stopPropagation();
        }

        if (event.key === 'ArrowUp') {
            if (index === 0) {
                document.getElementById(`payment-method-pill-none`)?.focus();
            } else if (index === 9999) {
                document
                    .getElementById(
                        `payment-method-pill-${activePaymentMethods.length - 1}`
                    )
                    ?.focus();
            } else {
                document
                    .getElementById(`payment-method-pill-${index - 1}`)
                    ?.focus();
            }

            event.stopPropagation();
        }
    };

    const handleFocus = () => {
        expenseTableContext.setFocusedColumnIndex(7);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };

    return (
        <td
            id={`expense-table-cell-${rowIndex}-7`}
            className={styles.expenseTableCell}
            tabIndex={0}
            onKeyDown={handleKeyDownCell}
            onFocus={handleFocus}
        >
            <div className={styles.paymentMethodCell} ref={cell}>
                <div
                    className={styles.paymentMethodText}
                    onClick={() => setIsEditingPaymentMethod(true)}
                >
                    {paymentMethod?.name}
                </div>

                {isEditingPaymentMethod && (
                    <div
                        className={styles.paymentMethodDropdown}
                        ref={dropdown}
                    >
                        {activePaymentMethods.map(
                            (activePaymentMethod, index) => (
                                <Pill
                                    style={{
                                        marginBottom: '1rem',
                                        marginRight: '0.5rem'
                                    }}
                                    id={`payment-method-pill-${index}`}
                                    key={activePaymentMethod.paymentMethodId}
                                    clickHandler={() =>
                                        handlePaymentMethodSelect(
                                            activePaymentMethod
                                        )
                                    }
                                    lightFont
                                    onKeyDown={(event) =>
                                        handleKeyDownPill(
                                            event,
                                            activePaymentMethod,
                                            index
                                        )
                                    }
                                    tabindex={0}
                                    color={PillColor.Black}
                                >
                                    {activePaymentMethod.name}
                                </Pill>
                            )
                        )}

                        <Pill
                            id={`payment-method-pill-none`}
                            clickHandler={() => handlePaymentMethodSelect(null)}
                            color={PillColor.Transparent}
                            onKeyDown={(event) =>
                                handleKeyDownPill(event, null, 9999)
                            }
                            tabindex={0}
                            style={{
                                marginBottom: '1rem'
                            }}
                        >
                            None
                        </Pill>
                    </div>
                )}
            </div>
        </td>
    );
}
