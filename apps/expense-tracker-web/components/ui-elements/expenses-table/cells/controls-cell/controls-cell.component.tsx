import { ExpenseDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import {
    Modal,
    ModalFooter,
    ModalHeader,
    useModal
} from '@clemann-developments/react/hooks/use-modal';
import {
    ExternalLinkIcon,
    MinusCircleIcon,
    XIcon
} from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import { ExpenseTableContext } from '../../expense-table.context';
import styles from '../../expenses-table.module.scss';
import ShareExpenseModal from './share-expense.modal';

export default function ExpenseControlsCell({
    expense,
    hasChanges,
    hideDelete,
    rowIndex,
    saveChanges,
    clearChanges,
    deleteExpense
}: {
    expense: ExpenseDto;
    hasChanges: boolean;
    hideDelete: boolean;
    rowIndex: number;
    saveChanges: () => Promise<void>;
    clearChanges: () => void;
    deleteExpense: () => Promise<void>;
}) {
    const expenseTableContext = useContext(ExpenseTableContext);

    const [saveButtonFocused, setSaveButtonFocused] = useState(false);
    const [shareButtonFocused, setShareButtonFocused] = useState(false);
    const [deleteButtonFocused, setDeleteButtonFocused] = useState(false);

    const { showModal, closeModal } = useModal();

    const handleSaveClick = async () => {
        await saveChanges();
        setSaveButtonFocused(false);
        expenseTableContext.focusCell(rowIndex + 1, 0);
    };
    const handleClearClick = async () => {
        await clearChanges();
        setDeleteButtonFocused(false);
    };
    const handleShareClick = async () => {
        showModal(
            <ShareExpenseModal
                expense={expense}
                onConfirm={async () => {
                    closeModal();
                }}
            />
        );
    };
    const handleDeleteClick = async () => {
        showModal(
            <ConfirmDeleteModal
                expense={expense}
                onConfirm={async () => {
                    await deleteExpense();
                    setDeleteButtonFocused(false);
                    closeModal();
                }}
            />
        );
    };

    const handleSaveFocus = () => {
        setSaveButtonFocused(true);
        expenseTableContext.setFocusedColumnIndex(9);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };
    const handleShareFocus = () => {
        setShareButtonFocused(true);
        expenseTableContext.setFocusedColumnIndex(10);
        expenseTableContext.setFocusedRowIndex(rowIndex);
    };
    const handleDeleteFocus = () => {
        setDeleteButtonFocused(true);
        expenseTableContext.setFocusedColumnIndex(11);
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
                    ${shareButtonFocused ? styles.focused : ''}
                `}
                >
                    {hasChanges ? (
                        <Button
                            id={`expense-table-cell-${rowIndex}-11`}
                            appearance={ButtonAppearance.Icon}
                            clickHandler={handleClearClick}
                            className={`${styles.noOutline} ${styles.opaque}`}
                            onFocus={handleDeleteFocus}
                            onBlur={() => setDeleteButtonFocused(false)}
                        >
                            <MinusCircleIcon />
                        </Button>
                    ) : (
                        <Button
                            id={`expense-table-cell-${rowIndex}-10`}
                            appearance={ButtonAppearance.Icon}
                            clickHandler={handleShareClick}
                            className={`${styles.noOutline} ${styles.opaque}`}
                            onFocus={handleShareFocus}
                            onBlur={() => setShareButtonFocused(false)}
                        >
                            <ExternalLinkIcon />
                        </Button>
                    )}
                </div>

                <div
                    className={`
                    ${styles.controlButtonWrapper}
                    ${deleteButtonFocused ? styles.focused : ''}
                `}
                >
                    {!hideDelete && (
                        <Button
                            id={`expense-table-cell-${rowIndex}-11`}
                            appearance={ButtonAppearance.Icon}
                            clickHandler={handleDeleteClick}
                            className={`${styles.noOutline} ${styles.opaque}`}
                            style={{
                                color: '#f44336'
                            }}
                            onFocus={handleDeleteFocus}
                            onBlur={() => setDeleteButtonFocused(false)}
                        >
                            <XIcon />
                        </Button>
                    )}
                </div>
            </div>
        </td>
    );
}

const ConfirmDeleteModal = ({
    expense,
    onConfirm
}: {
    expense: ExpenseDto;
    onConfirm: () => void;
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <Modal>
            <ModalHeader>
                Are you sure you want to delete the expense?
            </ModalHeader>
            <h4>{expense.name} </h4>
            <ModalFooter
                isSubmitting={isSubmitting}
                onOkClick={async () => {
                    setIsSubmitting(true);
                    await onConfirm();
                    setIsSubmitting(false);
                }}
            />
        </Modal>
    );
};
