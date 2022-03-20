import {
    ActiveSubcategoryDto,
    ExpenseCategoryDto,
    ExpenseSubcategoryDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useContext, useEffect, useRef, useState } from 'react';
import ActiveOptionsContext from '../../../../context/active-options.context';
import { ExpenseTableContext } from '../expense-table.context';
import styles from '../expenses-table.module.scss';

export default function ExpenseSubcategoryCell({
    subcategory,
    category,
    rowIndex,
    updateNewExpense
}: {
    subcategory: ExpenseSubcategoryDto;
    category: ExpenseCategoryDto;
    rowIndex: number;
    updateNewExpense: (
        category: ExpenseSubcategoryDto,
        valueKey: string
    ) => void;
}) {
    const expenseTableContext = useContext(ExpenseTableContext);

    const [isEditingSubcategory, setIsEditingSubcategory] = useState(false);
    const [subcategories, setSubCategories] = useState<ActiveSubcategoryDto[]>(
        []
    );
    const dropdown = useRef(null);
    const pill = useRef(null);

    const { activeCategories } = useContext(ActiveOptionsContext);

    useEffect(() => {
        setSubCategories(
            activeCategories?.filter(
                (cat) => cat.categoryId === category?.categoryId
            )[0]?.subcategories ?? []
        );
    }, [activeCategories, category]);

    useEffect(() => {
        if (isEditingSubcategory) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditingSubcategory]);

    const handleClickOutside = (e: { target: any }) => {
        if (
            dropdown?.current?.contains(e.target) ||
            pill?.current?.contains(e.target)
        ) {
            return;
        }
        setIsEditingSubcategory(false);
    };

    const handleSubcategorySelect = (
        activeSubcategory: ActiveSubcategoryDto
    ) => {
        if (activeSubcategory === null) {
            updateNewExpense(null, 'subcategory');
            setIsEditingSubcategory(false);
        } else {
            updateNewExpense(
                {
                    subcategoryId: activeSubcategory.subcategoryId,
                    name: activeSubcategory.name
                },
                'subcategory'
            );
        }
        expenseTableContext.focusCell(rowIndex, 4);

        setIsEditingSubcategory(false);
    };

    const handleKeyDownCell = (
        event: React.KeyboardEvent<HTMLTableCellElement>
    ) => {
        if (event.key === 'Enter') {
            setIsEditingSubcategory(true);
            event.stopPropagation();
        }

        if (event.key === 'ArrowDown' && isEditingSubcategory) {
            document.getElementById(`subcategory-pill-0`)?.focus();
            event.stopPropagation();
        }

        if (event.key === 'ArrowUp' && isEditingSubcategory) {
            setIsEditingSubcategory(false);
            expenseTableContext.focusCell(rowIndex, 2);
            event.stopPropagation();
        }

        if (
            (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
            isEditingSubcategory
        ) {
            setIsEditingSubcategory(false);
        }
    };

    const handleKeyDownPill = (
        event: React.KeyboardEvent<HTMLDivElement>,
        activeSubcategory: ActiveSubcategoryDto,
        index: number
    ) => {
        if (event.key === 'Tab' && index === 9999) {
            setIsEditingSubcategory(false);
        }

        if (event.key === 'Enter') {
            handleSubcategorySelect(activeSubcategory);
            event.stopPropagation();
        }
        if (event.key === 'Escape') {
            setIsEditingSubcategory(false);
            event.stopPropagation();
        }

        if (event.key === 'ArrowDown') {
            if (index === 9999) {
                document.getElementById(`subcategory-pill-0`)?.focus();
            } else if (index < subcategories.length - 1) {
                document
                    .getElementById(`subcategory-pill-${index + 1}`)
                    ?.focus();
            } else {
                document.getElementById(`subcategory-pill-none`)?.focus();
            }
            event.stopPropagation();
        }

        if (event.key === 'ArrowUp') {
            if (index === 0) {
                document.getElementById(`subcategory-pill-none`)?.focus();
            } else if (index === 9999) {
                document
                    .getElementById(
                        `subcategory-pill-${subcategories.length - 1}`
                    )
                    ?.focus();
            } else {
                document
                    .getElementById(`subcategory-pill-${index - 1}`)
                    ?.focus();
            }

            event.stopPropagation();
        }
    };

    const handleFocus = () => {
        expenseTableContext.setFocusedColumnIndex(3);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };

    return (
        <td
            id={`expense-table-cell-${rowIndex}-3`}
            className={`${styles.expenseTableCell} ${styles.categoryCell}`}
            tabIndex={0}
            onKeyDown={handleKeyDownCell}
            onFocus={handleFocus}
        >
            <div className={styles.categoryPill} ref={pill}>
                {subcategory ? (
                    <Pill
                        clickHandler={() => setIsEditingSubcategory(true)}
                        color={PillColor.GrayLight}
                    >
                        {subcategory.name}
                    </Pill>
                ) : (
                    <div
                        className={styles.categoryEmptyCell}
                        onClick={() => {
                            setIsEditingSubcategory(true);
                        }}
                    ></div>
                )}

                {isEditingSubcategory && (
                    <div className={styles.categoryDropdown} ref={dropdown}>
                        {subcategories.map((activeSubcategory, index) => (
                            <Pill
                                id={`subcategory-pill-${index}`}
                                style={{
                                    marginBottom: '1rem',
                                    marginRight: '0.5rem'
                                }}
                                key={activeSubcategory.subcategoryId}
                                onKeyDown={(event) =>
                                    handleKeyDownPill(
                                        event,
                                        activeSubcategory,
                                        index
                                    )
                                }
                                tabindex={0}
                                color={PillColor.GrayLight}
                                clickHandler={() =>
                                    handleSubcategorySelect(activeSubcategory)
                                }
                            >
                                {activeSubcategory.name}
                            </Pill>
                        ))}
                        <Pill
                            id={`subcategory-pill-none`}
                            clickHandler={() => handleSubcategorySelect(null)}
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
