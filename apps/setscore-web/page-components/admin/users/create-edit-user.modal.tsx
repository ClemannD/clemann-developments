import { Input, PhoneNumberInput } from '@clemann-developments/react/forms';
import {
    useModal,
    Modal,
    ModalHeader,
    ModalFooter
} from '@clemann-developments/react/hooks/use-modal';
import { Form, Formik } from 'formik';
import React from 'react';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import useCreateUser from '../../../api-services/admin/users/createUser.service';
import useEditUser from '../../../api-services/admin/users/editUser.service';
import { User } from '../../../api-services/entities/user.entity';

export default function CreateEditUserModal({
    onSubmit,
    user
}: {
    onSubmit?: () => void;
    user?: User;
}) {
    const createUser = useCreateUser();
    const editUser = useEditUser();
    const { closeModal } = useModal();

    return (
        <Modal>
            <ModalHeader>{user ? 'Edit' : 'Create'} User</ModalHeader>

            <Formik
                initialValues={{
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    email: user?.email || '',
                    phone: user?.phone || ''
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
                    if (user) {
                        try {
                            await editUser.mutateAsync({
                                ...values,
                                userId: user.userId
                            });
                            toast.success('User successfully updated');
                            if (onSubmit) {
                                onSubmit();
                            }
                            closeModal();
                        } catch {}
                    } else {
                        try {
                            await createUser.mutateAsync({
                                user: {
                                    ...values
                                }
                            });
                            toast.success('User successfully created');
                            if (onSubmit) {
                                onSubmit();
                            }
                            closeModal();
                        } catch {}
                    }
                }}
                render={(props) => {
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
                            <ModalFooter
                                okButtonText={user ? 'Edit' : 'Create'}
                                okButtonType="submit"
                            ></ModalFooter>
                        </Form>
                    );
                }}
            ></Formik>
        </Modal>
    );
}
