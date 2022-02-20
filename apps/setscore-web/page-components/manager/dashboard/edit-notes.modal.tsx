import { TextArea } from '@clemann-developments/react/components/forms';
import {
    Modal,
    ModalHeader,
    ModalFooter
} from '@clemann-developments/react/hooks/use-modal';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import useUpdateLeagueNotes from '../../../api-services/manager/dashboard/updateLeagueNotes.service';

export default function EditNotesModal({
    leagueNotes,
    onSubmit
}: {
    leagueNotes: string;
    onSubmit: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const updateLeagueNotes = useUpdateLeagueNotes();
    return (
        <Modal>
            <ModalHeader>Edit League Notes</ModalHeader>
            <Formik
                initialValues={{
                    leagueNotes
                }}
                onSubmit={async (values) => {
                    setIsSubmitting(true);
                    await updateLeagueNotes.mutateAsync({
                        leagueNotes: values.leagueNotes
                    });
                    onSubmit();
                    setIsSubmitting(false);
                }}
            >
                <Form>
                    <TextArea
                        label="League Notes"
                        type="textarea"
                        name="leagueNotes"
                    ></TextArea>
                    <ModalFooter
                        okButtonText="Save"
                        okButtonType="submit"
                        isSubmitting={isSubmitting}
                    ></ModalFooter>
                </Form>
            </Formik>
        </Modal>
    );
}
