import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { CourtDto } from '../../../../api-services/manager/models';
import useDeleteCourt from '../../../../api-services/manager/week/deleteCourt.service';
import useUpdateCourtNumber from '../../../../api-services/manager/week/updateCourtNumber.service';
import Button, {
    ButtonAppearance,
    ButtonSize
} from '../../../../components/buttons/button.component';
import Input from '../../../../components/forms/input/input.component';
import ModalFooter from '../../../../components/modal/modal-footer/modal-footer.component';
import ModalHeader from '../../../../components/modal/modal-header/modal-header.component';
import Modal from '../../../../components/modal/modal.component';

export default function UpdateCourtNumberModal(props: {
    court: CourtDto;
    onSubmit: () => void;
}) {
    const updateCourtNumber = useUpdateCourtNumber();
    const deleteCourt = useDeleteCourt();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Modal>
            <ModalHeader>Update Court Number</ModalHeader>
            <Formik
                initialValues={{
                    courtNumber: props.court.courtNumber
                }}
                onSubmit={async (values) => {
                    setIsSubmitting(true);
                    await updateCourtNumber.mutateAsync({
                        courtId: props.court.courtId,
                        courtNumber: values.courtNumber
                    });
                    setIsSubmitting(false);
                    props.onSubmit();
                }}
            >
                <Form>
                    {!props.court.sets.length && !props.court.players.length && (
                        <div>
                            <p
                                style={{
                                    marginBottom: '1rem'
                                }}
                            >
                                This court can be deleted since there are no
                                players or scores associated to it
                            </p>
                            <Button
                                style={{
                                    marginBottom: '3rem'
                                }}
                                appearance={ButtonAppearance.Danger}
                                size={ButtonSize.Block}
                                clickHandler={async () => {
                                    await deleteCourt.mutateAsync({
                                        courtId: props.court.courtId
                                    });
                                    props.onSubmit();
                                }}
                            >
                                Delete Court
                            </Button>
                        </div>
                    )}
                    <Input
                        label="Court Number"
                        name="courtNumber"
                        type="number"
                    ></Input>

                    <ModalFooter
                        isSubmitting={isSubmitting}
                        okButtonType="submit"
                        okButtonText="Update Court"
                    ></ModalFooter>
                </Form>
            </Formik>
        </Modal>
    );
}
