import { DatePickerField } from '@clemann-developments/react/components/forms';
import {
    Modal,
    ModalHeader,
    ModalFooter
} from '@clemann-developments/react/hooks/use-modal';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import useAddWeek from '../../../api-services/manager/dashboard/add-week.service';

export default function AddWeekModal(props: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addWeek = useAddWeek();

    return (
        <Modal>
            <ModalHeader>Add New Week</ModalHeader>
            <Formik
                initialValues={{
                    playingOnDate: new Date()
                }}
                validationSchema={Yup.object({
                    playingOnDate: Yup.date().required('Required')
                })}
                onSubmit={async (values) => {
                    setIsSubmitting(true);
                    await addWeek.mutateAsync({
                        seasonId: props.selectedSeason.seasonId,
                        weekNumber:
                            props.selectedSeason.weekSummaries.length + 1,
                        playingOnDate: values.playingOnDate
                    });
                    setIsSubmitting(false);
                    props.onSubmit();
                }}
            >
                <Form>
                    <p style={{ marginBottom: '2rem' }}>
                        Are you sure you want to add a new week? This will end
                        the current week and prevent players from submitting any
                        more scores.
                    </p>
                    <DatePickerField
                        name="playingOnDate"
                        label="Playing On Date"
                    ></DatePickerField>
                    <ModalFooter
                        okButtonType="submit"
                        okButtonText="Add Week"
                        isSubmitting={isSubmitting}
                    ></ModalFooter>
                </Form>
            </Formik>
        </Modal>
    );
}
