import { ExpenseDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { DataBox } from '@clemann-developments/react/components/ui-elements';
import {
    Modal,
    ModalFooter,
    ModalHeader
} from '@clemann-developments/react/hooks/use-modal';
import { useEffect, useState } from 'react';

export default function ShareExpenseModal({
    expense,
    onConfirm
}: {
    expense: ExpenseDto;
    onConfirm: () => void;
}) {
    const [csvString, setCsvString] = useState('');

    useEffect(() => {
        const csvString = `${expense.day}, ${expense.name}, ${
            expense.split || ''
        }, ${expense.amountCents}`;
        setCsvString(csvString);
    }, [expense]);

    return (
        <Modal>
            <ModalHeader>Share Expense</ModalHeader>
            <p
                style={{
                    marginBottom: '1rem'
                }}
            >
                The ability to share is a work in progress. For now, copy and
                send manually.
            </p>
            <DataBox>{csvString}</DataBox>
            <ModalFooter
                hideCancelButton
                okButtonText="Copy to clipboard and close"
                onOkClick={() => {
                    navigator.clipboard.writeText(csvString);
                    onConfirm();
                }}
            />
        </Modal>
    );
}
