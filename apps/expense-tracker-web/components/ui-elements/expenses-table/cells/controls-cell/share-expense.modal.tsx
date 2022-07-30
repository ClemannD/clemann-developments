import { ExpenseDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Modal,
    ModalFooter,
    ModalHeader
} from '@clemann-developments/react/hooks/use-modal';

export default function ShareExpenseModal({
    expense,
    onConfirm
}: {
    expense: ExpenseDto;
    onConfirm: () => void;
}) {
    return (
        <Modal>
            <ModalHeader>Share Expense</ModalHeader>
            <ModalFooter />
        </Modal>
    );
}
