import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import useCreateCourtForWeek from '../../../api-services/manager/week/createCourtForWeek.service';
import { WeekDto } from '../../../api-services/manager/week/getWeek.service';
import Input from '../../../components/forms/input/input.component';
import ModalFooter from '../../../components/modal/modal-footer/modal-footer.component';
import ModalHeader from '../../../components/modal/modal-header/modal-header.component';
import Modal from '../../../components/modal/modal.component';

export default function CreateCourtModal(props: {
    week: WeekDto;
    onSubmit: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const createCourtForWeek = useCreateCourtForWeek();

    return (
        <Modal>
            <ModalHeader>Add Court</ModalHeader>
            <Formik
                initialValues={{
                    courtNumber:
                        props.week.courts[props.week.courts.length - 1]
                            ?.courtNumber + 1 || 1
                }}
                onSubmit={async (values) => {
                    setIsSubmitting(true);
                    await createCourtForWeek.mutateAsync({
                        weekId: props.week.weekId,
                        courtNumber: values.courtNumber
                    });
                    setIsSubmitting(false);
                    props.onSubmit();
                }}
            >
                <Form>
                    <Input name="courtNumber" label="Court Number"></Input>
                    <ModalFooter
                        okButtonType="submit"
                        okButtonText="Add Court"
                        isSubmitting={isSubmitting}
                    ></ModalFooter>
                </Form>
            </Formik>
        </Modal>
    );
}
