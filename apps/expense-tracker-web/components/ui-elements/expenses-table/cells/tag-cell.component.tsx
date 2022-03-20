import {
    ActiveTagDto,
    ExpenseTagDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Label,
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { XIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useRef, useState } from 'react';
import ActiveOptionsContext from '../../../../context/active-options.context';
import { ExpenseTableContext } from '../expense-table.context';
import styles from '../expenses-table.module.scss';

export default function ExpenseTagCell({
    tags,
    rowIndex,
    updateNewExpense
}: {
    tags: ExpenseTagDto[];
    rowIndex: number;
    updateNewExpense: (tags: ExpenseTagDto[], valueKey: string) => void;
}) {
    const expenseTableContext = useContext(ExpenseTableContext);

    const [isEditingTags, setIsEditingTags] = useState(false);
    const [unselectedTags, setUnselectedTags] = useState<ActiveTagDto[]>([]);
    const dropdown = useRef(null);
    const pill = useRef(null);
    const closeButton = useRef(null);

    const { activeTags } = useContext(ActiveOptionsContext);

    useEffect(() => {
        setUnselectedTags(
            activeTags?.filter(
                (tag) => !tags?.some((t) => t.tagId === tag.tagId)
            ) ?? []
        );
    }, [activeTags, tags]);

    useEffect(() => {
        if (isEditingTags) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditingTags]);

    const handleClickOutside = (e: { target: any }) => {
        if (
            dropdown?.current?.contains(e.target) ||
            pill?.current?.contains(e.target)
        ) {
            return;
        }
        setIsEditingTags(false);
    };

    const handleTagSelect = (activeTag: ActiveTagDto) => {
        updateNewExpense(
            [
                ...(tags ?? []),
                {
                    tagId: activeTag.tagId,
                    name: activeTag.name
                }
            ],
            'tags'
        );
    };

    const handleTagRemove = (activeTag: ActiveTagDto) => {
        updateNewExpense(
            tags.filter((tag) => tag.tagId !== activeTag.tagId),
            'tags'
        );
    };

    const handleKeyDownCell = (
        event: React.KeyboardEvent<HTMLTableCellElement>
    ) => {
        if (event.key === 'Enter') {
            setIsEditingTags(true);
            event.stopPropagation();
        }

        if (event.key === 'Backspace') {
            updateNewExpense([], 'tags');
            event.stopPropagation();
        }

        if (event.key === 'Escape') {
            setIsEditingTags(false);
            event.stopPropagation();
        }

        if (event.key === 'ArrowDown' && isEditingTags) {
            document.getElementById(`tag-pill-0`)?.focus();
            event.stopPropagation();
        }

        if (event.key === 'ArrowUp' && isEditingTags) {
            setIsEditingTags(false);
            // expenseTableContext.focusCell(rowIndex, 4);
            // event.stopPropagation();
        }

        if (
            (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
            isEditingTags
        ) {
            setIsEditingTags(false);
        }
    };

    const handleKeyDownPill = (
        event: React.KeyboardEvent<HTMLDivElement>,
        activeTag: ActiveTagDto,
        remove: boolean,
        index: number
    ) => {
        if (event.key === 'Enter') {
            if (remove) {
                handleTagRemove(activeTag);
            } else {
                handleTagSelect(activeTag);
            }
            closeButton.current.focus();

            event.stopPropagation();
        }
        if (event.key === 'Escape') {
            setIsEditingTags(false);
            event.stopPropagation();
        }

        const lastTagIndex = tags.length + unselectedTags.length - 1;

        if (event.key === 'Tab' && index === lastTagIndex) {
            setIsEditingTags(false);
        }

        if (event.key === 'ArrowDown') {
            if (index === lastTagIndex) {
                document.getElementById(`tag-pill-0`)?.focus();
            } else if (index < lastTagIndex) {
                document.getElementById(`tag-pill-${index + 1}`)?.focus();
            }
            event.stopPropagation();
        }

        if (event.key === 'ArrowUp') {
            if (index === 0) {
                document.getElementById(`tag-pill-${lastTagIndex}`)?.focus();
            } else {
                document.getElementById(`tag-pill-${index - 1}`)?.focus();
            }

            event.stopPropagation();
        }
    };

    const handleKeyDownCloseButton = (
        event: React.KeyboardEvent<HTMLDivElement>
    ) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            setIsEditingTags(false);
            expenseTableContext.focusCell(rowIndex, 5);
            event.stopPropagation();
        }
    };

    const handleFocus = () => {
        expenseTableContext.setFocusedColumnIndex(4);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };

    return (
        <td
            id={`expense-table-cell-${rowIndex}-4`}
            className={`${styles.expenseTableCell} ${styles.tagCell}`}
            tabIndex={0}
            onKeyDown={handleKeyDownCell}
            onFocus={handleFocus}
        >
            <div className={styles.tagPill} ref={pill}>
                {tags?.length ? (
                    <>
                        <Pill
                            clickHandler={() => setIsEditingTags(true)}
                            color={PillColor.Black}
                            lightFont
                        >
                            {tags[0].name}
                        </Pill>
                        {tags.length > 1 && (
                            <div
                                className={styles.more}
                                onClick={() => setIsEditingTags(true)}
                            >
                                +{tags.length - 1} more
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        className={styles.tagEmptyCell}
                        onClick={() => {
                            setIsEditingTags(true);
                        }}
                    ></div>
                )}

                {isEditingTags && (
                    <div className={styles.tagDropdown} ref={dropdown}>
                        <div
                            className={styles.tagDropdownHeader}
                            ref={closeButton}
                            tabIndex={-1}
                            onClick={() => setIsEditingTags(false)}
                            onKeyDown={handleKeyDownCloseButton}
                        >
                            <XIcon height={'2rem'} width={'2rem'} />
                        </div>
                        <Label label="Selected Tags"></Label>
                        <div className={styles.selectedTags}>
                            {tags?.map((activeTag, index) => (
                                <Pill
                                    id={`tag-pill-${index}`}
                                    style={{
                                        marginBottom: '1rem',
                                        marginRight: '0.5rem'
                                    }}
                                    key={activeTag.tagId}
                                    color={PillColor.Black}
                                    lightFont
                                    onKeyDown={(event) =>
                                        handleKeyDownPill(
                                            event,
                                            activeTag,
                                            true,
                                            index
                                        )
                                    }
                                    tabindex={0}
                                    clickHandler={() =>
                                        handleTagRemove(activeTag)
                                    }
                                >
                                    {activeTag.name}{' '}
                                    <XIcon
                                        height={'1.2rem'}
                                        style={{
                                            marginLeft: '0.2rem'
                                        }}
                                    />
                                </Pill>
                            ))}
                            {tags?.length === 0 && (
                                <p className="body">No tags</p>
                            )}
                        </div>
                        <Label label="Available Tags"></Label>

                        <div className={styles.unselectedTags}>
                            {unselectedTags.map((activeTag, index) => (
                                <Pill
                                    id={`tag-pill-${tags?.length + index}`}
                                    style={{
                                        marginBottom: '1rem',
                                        marginRight: '0.5rem'
                                    }}
                                    key={activeTag.tagId}
                                    color={PillColor.Black}
                                    lightFont
                                    onKeyDown={(event) =>
                                        handleKeyDownPill(
                                            event,
                                            activeTag,
                                            false,
                                            tags.length + index
                                        )
                                    }
                                    tabindex={0}
                                    clickHandler={() =>
                                        handleTagSelect(activeTag)
                                    }
                                >
                                    {activeTag.name}
                                </Pill>
                            ))}
                            {unselectedTags?.length === 0 && (
                                <p className="body">No tags</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </td>
    );
}
