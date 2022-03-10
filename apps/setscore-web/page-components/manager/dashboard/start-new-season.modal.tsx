import { DatePickerField, Input } from '@clemann-developments/react/forms';
import {
    useModal,
    Modal,
    ModalHeader,
    ModalFooter
} from '@clemann-developments/react/hooks/use-modal';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import useStartNewSeason from '../../../api-services/manager/dashboard/startNewSeason.service';

export default function StartNewSeasonModal({
    lastSeasonNumber,
    onSubmit
}: {
    lastSeasonNumber: number;
    onSubmit?: () => void;
}) {
    const { closeModal } = useModal();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const startNewSeason = useStartNewSeason();

    return (
        <Modal>
            <ModalHeader>Start New Season</ModalHeader>
            <p style={{ marginBottom: '2rem' }}>
                Starting a new season will lock the data for the current season.
            </p>
            <Formik
                initialValues={{
                    newSeasonNumber: lastSeasonNumber + 1,
                    playingOnDate: new Date()
                }}
                validationSchema={Yup.object({
                    newSeasonNumber: Yup.number().required('Required'),
                    playingOnDate: Yup.date().required('Required')
                })}
                onSubmit={async (values) => {
                    setIsSubmitting(true);
                    await startNewSeason.mutateAsync({
                        newSeasonNumber: values.newSeasonNumber,
                        playingOnDate: values.playingOnDate
                    });
                    setIsSubmitting(false);

                    if (onSubmit) {
                        onSubmit();
                    }
                    closeModal();
                }}
            >
                <Form>
                    <Input
                        name="newSeasonNumber"
                        label="New Season Number"
                        type="number"
                    ></Input>
                    <DatePickerField
                        name="playingOnDate"
                        label="First week Playing On Date"
                    ></DatePickerField>
                    <ModalFooter
                        okButtonText="Start New Season"
                        okButtonType="submit"
                        cancelButtonText="Cancel"
                        isSubmitting={isSubmitting}
                    ></ModalFooter>
                </Form>
            </Formik>
        </Modal>
    );
}
