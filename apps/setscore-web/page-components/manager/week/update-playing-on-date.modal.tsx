import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import useUpdateWeekPlayingOnDate from '../../../api-services/manager/week/updateWeekPlayingOnDate.service';
import { DatePickerField } from '../../../components/forms/date-picker/date-picker.component';
import ModalFooter from '../../../components/modal/modal-footer/modal-footer.component';
import ModalHeader from '../../../components/modal/modal-header/modal-header.component';
import Modal from '../../../components/modal/modal.component';
import DataBox from '../../../components/ui-elements/data-box/data-box.component';
import DataPoint from '../../../components/ui-elements/data-point/data-point.component';

export default function UpdatePlayingOnDateModal(props: {
    weekId: string;
    weekNumber: number;
    seasonNumber: number;
    playingOnDate: Date;
    onSubmit: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const updateWeekPlayingOnDate = useUpdateWeekPlayingOnDate();

    return (
        <Modal>
            <ModalHeader>Update Playing On date</ModalHeader>
            <Formik
                initialValues={{
                    playingOnDate: props.playingOnDate
                }}
                onSubmit={async (values) => {
                    setIsSubmitting(true);
                    await updateWeekPlayingOnDate.mutateAsync({
                        playingOnDate: values.playingOnDate,
                        weekId: props.weekId
                    });
                    setIsSubmitting(false);
                    props.onSubmit();
                }}
            >
                <Form>
                    <DataBox style={{ marginBottom: '2rem' }}>
                        <DataPoint
                            label={`Season ${props.seasonNumber}`}
                        >{`Week ${props.weekNumber}`}</DataPoint>
                    </DataBox>
                    <DatePickerField
                        name="playingOnDate"
                        label="Playing On Date"
                    ></DatePickerField>
                    <ModalFooter
                        okButtonType="submit"
                        okButtonText="Update"
                        isSubmitting={isSubmitting}
                    ></ModalFooter>
                </Form>
            </Formik>
        </Modal>
    );
}
