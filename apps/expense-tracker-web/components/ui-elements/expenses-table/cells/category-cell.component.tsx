import {
    ActiveCategoryDto,
    ExpenseCategoryDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useContext, useEffect, useRef, useState } from 'react';
import ActiveOptionsContext from '../../../../context/active-options.context';
import { ExpenseTableContext } from '../expense-table.context';
import styles from '../expenses-table.module.scss';

export default function ExpenseCategoryCell({
    category,
    rowIndex,
    updateNewExpense
}: {
    category: ExpenseCategoryDto;
    rowIndex: number;
    updateNewExpense: (category: ExpenseCategoryDto, valueKey: string) => void;
}) {
    const expenseTableContext = useContext(ExpenseTableContext);
    const { activeCategories } = useContext(ActiveOptionsContext);

    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const dropdown = useRef(null);
    const pill = useRef(null);

    useEffect(() => {
        if (isEditingCategory) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditingCategory]);

    const handleClickOutside = (e: { target: any }) => {
        if (
            dropdown?.current?.contains(e.target) ||
            pill?.current?.contains(e.target)
        ) {
            return;
        }
        setIsEditingCategory(false);
    };

    const handleCategorySelect = (activeCategory: ActiveCategoryDto) => {
        if (activeCategory === null) {
            updateNewExpense(null, 'category');
            updateNewExpense(null, 'subcategory');
        } else {
            if (activeCategory.categoryId !== category?.categoryId) {
                updateNewExpense(null, 'subcategory');
            }
            updateNewExpense(
                {
                    categoryId: activeCategory.categoryId,
                    name: activeCategory.name,
                    color: activeCategory.color
                },
                'category'
            );
        }

        expenseTableContext.focusCell(rowIndex, 3);

        setIsEditingCategory(false);
    };

    const handleKeyDownCell = (
        event: React.KeyboardEvent<HTMLTableCellElement>
    ) => {
        if (event.key === 'Enter') {
            setIsEditingCategory(true);
            event.stopPropagation();
        }

        if (event.key === 'Backspace') {
            updateNewExpense(null, 'category');
            updateNewExpense(null, 'subcategory');
            event.stopPropagation();
        }

        if (event.key === 'ArrowDown' && isEditingCategory) {
            document.getElementById(`category-pill-0`)?.focus();
            event.stopPropagation();
        }

        if (event.key === 'ArrowUp' && isEditingCategory) {
            setIsEditingCategory(false);
            // expenseTableContext.focusCell(rowIndex, 2);
            // event.stopPropagation();
        }

        if (
            (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
            isEditingCategory
        ) {
            setIsEditingCategory(false);
        }
    };

    const handleKeyDownPill = (
        event: React.KeyboardEvent<HTMLDivElement>,
        activeCategory: ActiveCategoryDto,
        index: number
    ) => {
        if (event.key === 'Tab' && index === 9999) {
            setIsEditingCategory(false);
        }

        if (event.key === 'Enter') {
            handleCategorySelect(activeCategory);
            event.stopPropagation();
        }
        if (event.key === 'Escape') {
            setIsEditingCategory(false);
            event.stopPropagation();
        }

        if (event.key === 'ArrowDown') {
            if (index === 9999) {
                document.getElementById(`category-pill-0`)?.focus();
            } else if (index < activeCategories.length - 1) {
                document.getElementById(`category-pill-${index + 1}`)?.focus();
            } else {
                document.getElementById(`category-pill-none`)?.focus();
            }
            event.stopPropagation();
        }

        if (event.key === 'ArrowUp') {
            if (index === 0) {
                document.getElementById(`category-pill-none`)?.focus();
            } else if (index === 9999) {
                document
                    .getElementById(
                        `category-pill-${activeCategories.length - 1}`
                    )
                    ?.focus();
            } else {
                document.getElementById(`category-pill-${index - 1}`)?.focus();
            }

            event.stopPropagation();
        }
    };

    const handleFocus = () => {
        expenseTableContext.setFocusedColumnIndex(2);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };

    return (
        <td
            id={`expense-table-cell-${rowIndex}-2`}
            className={`${styles.expenseTableCell} ${styles.categoryCell}`}
            tabIndex={0}
            onKeyDown={handleKeyDownCell}
            onFocus={handleFocus}
        >
            <div className={styles.categoryPill} ref={pill}>
                {category ? (
                    <Pill
                        clickHandler={() => setIsEditingCategory(true)}
                        colorHex={category.color}
                    >
                        {category.name}
                    </Pill>
                ) : (
                    <div
                        className={styles.categoryEmptyCell}
                        onClick={() => setIsEditingCategory(true)}
                    ></div>
                )}

                {isEditingCategory && (
                    <div className={styles.categoryDropdown} ref={dropdown}>
                        {activeCategories.map((activeCategory, index) => (
                            <Pill
                                id={`category-pill-${index}`}
                                style={{
                                    marginBottom: '1rem',
                                    marginRight: '0.5rem'
                                }}
                                key={activeCategory.categoryId}
                                clickHandler={() =>
                                    handleCategorySelect(activeCategory)
                                }
                                onKeyDown={(event) =>
                                    handleKeyDownPill(
                                        event,
                                        activeCategory,
                                        index
                                    )
                                }
                                tabindex={0}
                                colorHex={activeCategory.color}
                            >
                                {activeCategory.name}
                            </Pill>
                        ))}
                        <Pill
                            id={`category-pill-none`}
                            clickHandler={() => handleCategorySelect(null)}
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
