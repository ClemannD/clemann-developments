import { Loading } from '@clemann-developments/react/components/ui-elements';
import { Select } from '@clemann-developments/react/forms';
import {
    useModal,
    Modal,
    ModalHeader,
    ModalFooter
} from '@clemann-developments/react/hooks/use-modal';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import useAddUserToLeague from '../../../../api-services/admin/leagues/addUserToLeague.service';
import useListUsers from '../../../../api-services/admin/users/listUsers.service';
import { League } from '../../../../api-services/entities/league.entity';
import { LeagueMemberType } from '../../../../api-services/entities/userToLeague.entity';
import LeagueMemberTypeSelect from '../../../../components/forms/league-member-type-select/league-member-type-select.component';
import DataBox from '../../../../components/ui-elements/data-box/data-box.component';
import DataPoint from '../../../../components/ui-elements/data-point/data-point.component';

export default function AddUserToLeagueModal({
    league,
    onSubmit
}: {
    league: League;
    onSubmit: () => void;
}) {
    const listUsers = useListUsers({});
    const addUserToLeague = useAddUserToLeague();
    const { closeModal } = useModal();

    useEffect(() => {
        listUsers.apiService.mutate({});
    }, []);

    return (
        <Modal>
            <ModalHeader>Add User To League</ModalHeader>
            <DataBox style={{ marginBottom: '2rem' }}>
                <DataPoint label="League">{league.name}</DataPoint>
            </DataBox>
            {listUsers.apiService.isLoading ? (
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
                            await addUserToLeague.mutateAsync({
                                leagueId: league.leagueId,
                                userId: values.userId,
                                leagueMemberType: values.leagueMemberType
                            });
                            toast.success('User successfully added to league');
                        } catch {}
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
                            {listUsers?.rows?.map((row) => (
                                <option key={row.userId} value={row.userId}>
                                    {row.firstName} {row.lastName} -{' '}
                                    {row.email || 'No Email'}
                                </option>
                            ))}
                        </Select>
                        <LeagueMemberTypeSelect></LeagueMemberTypeSelect>
                        <ModalFooter
                            okButtonText="Add"
                            okButtonType="submit"
                        ></ModalFooter>
                    </Form>
                </Formik>
            )}
        </Modal>
    );
}
