import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import useUpdateLeagueNotes from '../../../api-services/manager/dashboard/updateLeagueNotes.service';
import Input from '../../../components/forms/input/input.component';
import TextArea from '../../../components/forms/text-area/text-area.component';
import ModalFooter from '../../../components/modal/modal-footer/modal-footer.component';
import ModalHeader from '../../../components/modal/modal-header/modal-header.component';
import Modal from '../../../components/modal/modal.component';

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