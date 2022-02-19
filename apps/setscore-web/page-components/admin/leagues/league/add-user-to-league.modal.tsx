import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import {
    Modal,
    ModalFooter,
    ModalHeader,
    useModal
} from '@clemann-developments/react/hooks/use-modal';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import useAddUserToLeague from '../../../../api-services/admin/leagues/addUserToLeague.service';
import useCreateUserForLeague from '../../../../api-services/admin/leagues/createUserForLeague.service';
import useListUsers from '../../../../api-services/admin/users/listUsers.service';
import { League } from '../../../../api-services/entities/league.entity';
import { LeagueMemberType } from '../../../../api-services/entities/userToLeague.entity';

import Input from '../../../../components/forms/input/input.component';
import LeagueMemberTypeSelect from '../../../../components/forms/league-member-type-select/league-member-type-select.component';
import PhoneNumberInput from '../../../../components/forms/phone-input/phone-input.component';
import Select from '../../../../components/forms/select/select.component';
import Loading from '../../../../components/navigation/loading/loading.component';
import DataBox from '../../../../components/ui-elements/data-box/data-box.component';
import DataPoint from '../../../../components/ui-elements/data-point/data-point.component';

enum CreateUserModalState {
    Unselected = 1,
    NewUser = 2,
    ExistingUser = 3
}

export default function AddUserToLeagueModal({
    league,
    onSubmit
}: {
    league: League;
    onSubmit: () => void;
}) {
    const listUsers = useListUsers({});
    const addUserToLeague = useAddUserToLeague();
    const createUserForLeague = useCreateUserForLeague();
    const { closeModal } = useModal();
    const [modalState, setModalState] = useState<CreateUserModalState>(
        CreateUserModalState.Unselected
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Modal>
            <ModalHeader>Add User To League</ModalHeader>
            <DataBox style={{ marginBottom: '2rem' }}>
                <DataPoint label="League">{league.name}</DataPoint>
            </DataBox>

            {modalState === CreateUserModalState.Unselected && (
                <>
                    <Button
                        style={{
                            marginBottom: '1rem'
                        }}
                        appearance={ButtonAppearance.Primary}
                        size={ButtonSize.Block}
                        clickHandler={() =>
                            setModalState(CreateUserModalState.NewUser)
                        }
                    >
                        Create New User
                    </Button>
                    <Button
                        appearance={ButtonAppearance.Primary}
                        size={ButtonSize.Block}
                        clickHandler={() =>
                            setModalState(CreateUserModalState.ExistingUser)
                        }
                    >
                        Add Existing User
                    </Button>
                    <ModalFooter hideOkButton={true}></ModalFooter>
                </>
            )}

            {modalState === CreateUserModalState.NewUser && (
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        leagueMemberType: LeagueMemberType.Player
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
                        try {
                            setIsSubmitting(true);
                            try {
                                await createUserForLeague.mutateAsync({
                                    leagueId: league.leagueId,
                                    ...values
                                });
                                toast.success('Player successfully created');
                            } catch {
                            } finally {
                                setIsSubmitting(false);
                            }
                            if (onSubmit) {
                                onSubmit();
                            }
                            closeModal();
                        } catch {}
                    }}
                >
                    {(props) => {
                        return (
                            <Form>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                ></Input>
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                ></Input>
                                <Input name="email" label="Email"></Input>

                                <PhoneNumberInput
                                    name="phone"
                                    label="Phone Number"
                                    formikProps={props}
                                ></PhoneNumberInput>
                                <LeagueMemberTypeSelect></LeagueMemberTypeSelect>
                                <ModalFooter
                                    okButtonText="Create Player For League"
                                    okButtonType="submit"
                                    cancelButtonText="Back"
                                    isSubmitting={isSubmitting}
                                    onCancelClick={() =>
                                        setModalState(
                                            CreateUserModalState.Unselected
                                        )
                                    }
                                ></ModalFooter>
                            </Form>
                        );
                    }}
                </Formik>
            )}

            {modalState === CreateUserModalState.ExistingUser ? (
                listUsers.apiService.isLoading ? (
                    <Loading></Loading>
                ) : (
                    <Formik
                        initialValues={{
                            userId: '',
                            leagueMemberType: LeagueMemberType.Player
                        }}
                        validationSchema={Yup.object({
                            userId: Yup.string().required('Required'),
                            leagueMemberType: Yup.string().required('Required')
                        })}
                        onSubmit={async (values) => {
                            try {
                                setIsSubmitting(true);
                                await addUserToLeague.mutateAsync({
                                    leagueId: league.leagueId,
                                    userId: values.userId,
                                    leagueMemberType: values.leagueMemberType
                                });
                                toast.success(
                                    'User successfully added to league'
                                );
                            } catch {
                            } finally {
                                setIsSubmitting(false);
                            }
                            if (onSubmit) {
                                onSubmit();
                            }
                            closeModal();
                        }}
                    >
                        <Form>
                            <Select
                                name="userId"
                                label="User to add"
                                placeholder="User"
                            >
                                <option>Select a user</option>
                                {listUsers.rows?.map((row) => (
                                    <option key={row.userId} value={row.userId}>
                                        {row.firstName} {row.lastName} -{' '}
                                        {row.email || 'No Email'}
                                    </option>
                                ))}
                            </Select>
                            <LeagueMemberTypeSelect></LeagueMemberTypeSelect>
                            <ModalFooter
                                okButtonText="Add User To League"
                                okButtonType="submit"
                                isSubmitting={isSubmitting}
                                cancelButtonText="Back"
                                onCancelClick={() =>
                                    setModalState(
                                        CreateUserModalState.Unselected
                                    )
                                }
                            ></ModalFooter>
                        </Form>
                    </Formik>
                )
            ) : null}
        </Modal>
    );
}
