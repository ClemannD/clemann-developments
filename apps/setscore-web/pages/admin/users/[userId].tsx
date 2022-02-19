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
import { PencilAltIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useGetUser from '../../../api-services/admin/users/getUser.service';
import useUpdateUserRole from '../../../api-services/admin/users/updateUserRole.service';
import { UserRole } from '../../../api-services/entities/user.entity';
import Card from '../../../components/cards/card/card.component';
import Select from '../../../components/forms/select/select.component';
import AdminLayout from '../../../components/layouts/admin-layout/admin-layout.component';
import Loading from '../../../components/navigation/loading/loading.component';
import DataPoint from '../../../components/ui-elements/data-point/data-point.component';
import PageHeader from '../../../components/ui-elements/page-header/page-header.component';
import UserLeaguesTable from '../../../page-components/admin/users/user/user-leagues-table.component';
import styles from '../../../styles/pages/admin/users/user.module.scss';

export default function UserPage() {
    const router = useRouter();
    const { showModal, closeModal } = useModal();
    const getUser = useGetUser();
    const updateUserRole = useUpdateUserRole();

    const [isSubmittingUserRole, setIsSubmittingUserRole] =
        useState<boolean>(false);

    useEffect(() => {
        fetchUserData();
    }, [router.query]);

    const fetchUserData = () => {
        getUser.mutate({
            userId: router.query.userId as string
        });
    };

    const UserRoleModal = () => {
        return (
            <Modal>
                <ModalHeader>Change User Role</ModalHeader>
                <Formik
                    initialValues={{ role: getUser.data.user.role }}
                    onSubmit={async (values) => {
                        setIsSubmittingUserRole(true);
                        await updateUserRole.mutateAsync({
                            userId: getUser.data.user.userId,
                            role: values.role
                        });
                        setIsSubmittingUserRole(false);
                        closeModal();
                        fetchUserData();
                    }}
                >
                    <Form>
                        <Select
                            label="Role"
                            subLabel={`Select the role to assign to ${getUser.data.user.firstName} ${getUser.data.user.lastName}`}
                            name="role"
                        >
                            <option value={UserRole.Admin}>
                                {UserRole.Admin}
                            </option>
                            <option value={UserRole.Manager}>
                                {UserRole.Manager}
                            </option>
                            <option value={UserRole.Player}>
                                {UserRole.Player}
                            </option>
                            <option value={UserRole.Unassigned}>
                                {UserRole.Unassigned}
                            </option>
                        </Select>
                        <ModalFooter
                            okButtonText="Submit"
                            isSubmitting={isSubmittingUserRole}
                            okButtonType="submit"
                        ></ModalFooter>
                    </Form>
                </Formik>
            </Modal>
        );
    };

    return (
        <AdminLayout>
            <div>
                <PageHeader
                    subHeader="User"
                    header={
                        getUser?.data?.user &&
                        `${getUser?.data?.user?.firstName} ${getUser?.data?.user?.lastName}`
                    }
                    backButtonText="All Users"
                    backButtonHandler={() => router.back()}
                ></PageHeader>
                {getUser?.data?.user ? (
                    <div className="row">
                        <div
                            className="col-12 col-lg-6"
                            style={{ marginBottom: '4rem' }}
                        >
                            <Card header="User Info">
                                <div className={styles.userInfo}>
                                    <DataPoint
                                        label="Role"
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <div style={{ display: 'flex' }}>
                                            {getUser.data.user.role}
                                            <Button
                                                style={{ marginLeft: '1rem' }}
                                                appearance={
                                                    ButtonAppearance.Icon
                                                }
                                                clickHandler={() => {
                                                    showModal(
                                                        <UserRoleModal></UserRoleModal>
                                                    );
                                                }}
                                            >
                                                <PencilAltIcon></PencilAltIcon>
                                            </Button>
                                        </div>
                                    </DataPoint>
                                    <DataPoint
                                        label="Status"
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        {getUser.data.user.status}
                                    </DataPoint>
                                    <DataPoint
                                        label="User ID"
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        {getUser.data.user.userId}
                                    </DataPoint>
                                    {getUser.data.user.oldUserId && (
                                        <DataPoint
                                            label="Old User ID"
                                            style={{ marginBottom: '2rem' }}
                                        >
                                            <Link
                                                href={`/admin/users/${getUser.data.user.oldUserId}`}
                                            >
                                                {getUser.data.user.oldUserId}
                                            </Link>
                                        </DataPoint>
                                    )}
                                    <DataPoint
                                        label="Third Party ID"
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        {getUser.data.user.thirdPartyId || '--'}
                                    </DataPoint>
                                    <DataPoint
                                        label="Email"
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        {getUser.data.user.email || '--'}
                                    </DataPoint>
                                </div>
                            </Card>
                        </div>
                        <div className="col-12 col-lg-6">
                            <UserLeaguesTable
                                user={getUser.data.user}
                                fetchUserData={fetchUserData}
                            ></UserLeaguesTable>
                        </div>
                    </div>
                ) : (
                    <Loading></Loading>
                )}
            </div>
        </AdminLayout>
    );
}
