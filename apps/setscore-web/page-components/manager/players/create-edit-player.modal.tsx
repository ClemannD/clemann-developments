import {
    Input,
    PhoneNumberInput
} from '@clemann-developments/react/components/forms';
import {
    useModal,
    Modal,
    ModalHeader,
    ModalFooter
} from '@clemann-developments/react/hooks/use-modal';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import {
    LeagueMemberType,
    UserToLeague
} from '../../../api-services/entities/userToLeague.entity';
import useCreatePlayer from '../../../api-services/manager/players/createPlayer.service';
import useEditPlayer from '../../../api-services/manager/players/editPlayer.service';
import LeagueMemberTypeSelect from '../../../components/forms/league-member-type-select/league-member-type-select.component';

export default function CreateEditPlayerModal({
    onSubmit,
    userToLeague
}: {
    onSubmit?: () => void;
    userToLeague?: UserToLeague;
}) {
    const createPlayer = useCreatePlayer();
    const editPlayer = useEditPlayer();
    const { closeModal } = useModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Modal>
            <ModalHeader>{userToLeague ? 'Edit' : 'Create'} Player</ModalHeader>

            <Formik
                initialValues={{
                    firstName: userToLeague?.user?.firstName || '',
                    lastName: userToLeague?.user?.lastName || '',
                    email: userToLeague?.user?.email || '',
                    phone: userToLeague?.user?.phone || '',
                    leagueMemberType:
                        userToLeague?.leagueMemberType ||
                        LeagueMemberType.Player
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    email: Yup.string().email(),
                    phone: Yup.string().max(12, 'Invalid phone number')
                })}
                onSubmit={async (values) => {
                    setIsSubmitting(true);
                    if (userToLeague) {
                        try {
                            await editPlayer.mutateAsync({
                                ...values,
                                userId: userToLeague.user.userId
                            });
                            toast.success('Player successfully updated');
                            if (onSubmit) {
                                onSubmit();
                            }
                            closeModal();
                        } catch {}
                    } else {
                        try {
                            await createPlayer.mutateAsync({
                                ...values
                            });
                            toast.success('Player successfully created');
                            if (onSubmit) {
                                onSubmit();
                            }
                            closeModal();
                        } catch {}
                    }
                    setIsSubmitting(false);
                }}
            >
                {(props) => {
                    return (
                        <Form>
                            <Input name="firstName" label="First Name"></Input>
                            <Input name="lastName" label="Last Name"></Input>
                            <Input name="email" label="Email"></Input>

                            <PhoneNumberInput
                                name="phone"
                                label="Phone Number"
                                formikProps={props}
                            ></PhoneNumberInput>
                            <LeagueMemberTypeSelect></LeagueMemberTypeSelect>
                            <ModalFooter
                                okButtonText={userToLeague ? 'Save' : 'Create'}
                                okButtonType="submit"
                                isSubmitting={isSubmitting}
                            ></ModalFooter>
                        </Form>
                    );
                }}
            </Formik>
        </Modal>
    );
}
