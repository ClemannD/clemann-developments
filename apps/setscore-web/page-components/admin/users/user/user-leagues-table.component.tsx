import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import {
    useModal,
    Modal,
    ModalHeader,
    ModalFooter
} from '@clemann-developments/react/hooks/use-modal';
import { UserRemoveIcon, XIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useAddUserToLeague from '../../../../api-services/admin/leagues/addUserToLeague.service';
import useRemoveUserFromLeague from '../../../../api-services/admin/leagues/removeUserFromLeague.service';
import { User } from '../../../../api-services/entities/user.entity';
import { LeagueMemberType } from '../../../../api-services/entities/userToLeague.entity';
import Card from '../../../../components/cards/card/card.component';
import { Input } from '@clemann-developments/react/components/forms';
import Table, {
    Column,
    ColumnHeader,
    TableRow
} from '../../../../components/tables/table.component';
import RemoveUserFromLeagueModal from '../../leagues/league/remove-user-from-league.modal';

export default function UserLeaguesTable({
    user,
    fetchUserData
}: {
    user: User;
    fetchUserData: () => void;
}) {
    const { showModal, closeModal } = useModal();
    const [isSubmittingAddUser, setIsSubmittingAddUser] =
        useState<boolean>(false);
    const [isSubmittingRemoveUser, setIsSubmittingRemoveUser] =
        useState<boolean>(false);

    const addUserToLeague = useAddUserToLeague();
    const removeUserFromLeague = useRemoveUserFromLeague();

    useEffect(() => {
        if (addUserToLeague.isSuccess) {
            closeModal();
        }
    }, [addUserToLeague.isSuccess]);

    const AddUserToLeagueModal = () => (
        <Modal>
            <ModalHeader>Add User To League</ModalHeader>
            <Formik
                initialValues={{
                    leagueId: ''
                }}
                validationSchema={Yup.object({
                    leagueId: Yup.string().required('Required')
                })}
                onSubmit={async (values) => {
                    setIsSubmittingAddUser(true);
                    await addUserToLeague.mutateAsync({
                        userId: user.userId,
                        leagueId: values.leagueId,
                        leagueMemberType: LeagueMemberType.Player
                    });

                    setIsSubmittingAddUser(false);
                    closeModal();
                    fetchUserData();
                }}
            >
                <Form>
                    <Input
                        name="leagueId"
                        label="League Id"
                        subLabel={`Enter the id of the league to add ${user.firstName} ${user.lastName} to`}
                    ></Input>
                    <ModalFooter
                        okButtonText="Submit"
                        isSubmitting={isSubmittingAddUser}
                        okButtonType="submit"
                    ></ModalFooter>
                </Form>
            </Formik>
        </Modal>
    );

    // const RemoveUserFromLeagueModal = (props) => (
    //     <Modal>
    //         <ModalHeader>Remove User From League</ModalHeader>
    //         <p>
    //             Are you sure you want to remove{' '}
    //             <b>
    //                 {user.firstName} {user.lastName}
    //             </b>{' '}
    //             from {props.league.name}?
    //         </p>
    //         <ModalFooter
    //             okButtonText="Remove"
    //             isDangerButton
    //             isSubmitting={isSubmittingRemoveUser}
    //             onOkClick={async () => {
    //                 setIsSubmittingRemoveUser(true);
    //                 await removeUserFromLeague.mutateAsync({
    //                     userId: user.userId,
    //                     leagueId: props.league.leagueId
    //                 });
    //                 setIsSubmittingRemoveUser(false);
    //                 closeModal();
    //                 fetchUserData();
    //             }}
    //         ></ModalFooter>
    //     </Modal>
    // );

    return (
        <Card
            header={
                <>
                    <div>User Leagues</div>
                    <Button
                        appearance={ButtonAppearance.Secondary}
                        clickHandler={() =>
                            showModal(
                                <AddUserToLeagueModal></AddUserToLeagueModal>
                            )
                        }
                    >
                        Add
                    </Button>
                </>
            }
        >
            {user.userToLeague.length ? (
                <Table
                    showCard={false}
                    headers={
                        <>
                            <ColumnHeader header="League"></ColumnHeader>
                            <ColumnHeader header="Member Type"></ColumnHeader>
                            <ColumnHeader width="3rem" header=""></ColumnHeader>
                        </>
                    }
                    rows={
                        <>
                            {user.userToLeague.map((userToLeague) => (
                                <TableRow key={userToLeague.leagueId}>
                                    <Column>
                                        <Link
                                            href={`/admin/leagues/${userToLeague.leagueId}`}
                                        >
                                            {userToLeague.league.name}
                                        </Link>
                                    </Column>
                                    <Column>
                                        {userToLeague.leagueMemberType}
                                    </Column>
                                    <Column>
                                        <Button
                                            appearance={ButtonAppearance.Icon}
                                            linkColor="red"
                                            clickHandler={() =>
                                                showModal(
                                                    <RemoveUserFromLeagueModal
                                                        league={
                                                            userToLeague.league
                                                        }
                                                        user={user}
                                                        onSubmit={fetchUserData}
                                                    ></RemoveUserFromLeagueModal>
                                                )
                                            }
                                        >
                                            <UserRemoveIcon></UserRemoveIcon>
                                        </Button>
                                    </Column>
                                </TableRow>
                            ))}
                        </>
                    }
                ></Table>
            ) : (
                <div
                    style={{
                        padding: '3rem',
                        textAlign: 'center'
                    }}
                >
                    No Leagues
                </div>
            )}
        </Card>
    );
}
