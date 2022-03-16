import { SortDirection, TakeAll } from '@clemann-developments/common-endpoint';
import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import { Checkbox, CheckboxList } from '@clemann-developments/react/forms';
import { useModal } from '@clemann-developments/react/hooks/use-modal';
import { useWindowSize } from '@clemann-developments/react/hooks/use-window-dimensions';
import {
    MinusCircleIcon,
    PencilAltIcon,
    PlusCircleIcon
} from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import useListUsers from '../../../api-services/admin/users/listUsers.service';
import OnFormChangeHandler from '../../../components/forms/on-form-change-handler.component';
import AdminLayout from '../../../components/layouts/admin-layout/admin-layout.component';
import Table, {
    Column,
    ColumnHeader,
    TableRow
} from '../../../components/tables/table.component';
import PageHeader from '../../../components/ui-elements/page-header/page-header.component';
import CreateEditUserModal from '../../../page-components/admin/users/create-edit-user.modal';
import DeleteUserModal from '../../../page-components/admin/users/delete-user.modal';
import styles from '../../../styles/pages/admin/users/users.module.scss';

export default function Users() {
    const { showModal } = useModal();
    const router = useRouter();
    const { mediumBelow } = useWindowSize();
    const listUsers = useListUsers({
        paginationAndSort: {
            skip: 0,
            take: TakeAll,
            sortColumn: 'firstName',
            sortDirection: SortDirection.Asc
        },
        filters: {
            showRegistered: true,
            showPlaceholders: true,
            showReplaced: true,

            showPlayers: true,
            showAdmins: true,
            showManagers: true,
            showUnassigned: true
        }
    });

    return (
        <AdminLayout>
            <PageHeader
                subHeader="Admin"
                header="Users"
                actionButtonHandler={() => {
                    showModal(
                        <CreateEditUserModal
                            onSubmit={() => listUsers.dispatch()}
                        ></CreateEditUserModal>
                    );
                }}
                actionButtonText={
                    <>
                        <PlusCircleIcon
                            height="1.8rem"
                            style={{
                                marginRight: mediumBelow ? '0' : '1rem'
                            }}
                        ></PlusCircleIcon>
                        {!mediumBelow && 'Create User'}
                    </>
                }
            ></PageHeader>

            <Table
                isLoading={listUsers.apiService.isLoading}
                noData={listUsers?.rows?.length === 0}
                filters={
                    <div>
                        <Formik
                            initialValues={{
                                showRegistered: true,
                                showPlaceholders: true,
                                showReplaced: true,

                                showPlayers: true,
                                showAdmins: true,
                                showManagers: true,
                                showUnassigned: true
                            }}
                            onSubmit={(_) => {}}
                        >
                            <Form className={styles.filtersForm}>
                                <OnFormChangeHandler
                                    onChange={(values) => {
                                        listUsers.handleFilter(values);
                                    }}
                                />
                                <CheckboxList
                                    label="Status"
                                    style={{ marginRight: '2rem' }}
                                >
                                    <Checkbox
                                        name="showRegistered"
                                        label="Registered"
                                    ></Checkbox>
                                    <Checkbox
                                        name="showPlaceholders"
                                        label="Placeholders"
                                    ></Checkbox>
                                    <Checkbox
                                        name="showReplaced"
                                        label="Replaced"
                                    ></Checkbox>
                                </CheckboxList>
                                <CheckboxList label="Role">
                                    <Checkbox
                                        name="showPlayers"
                                        label="Player"
                                    ></Checkbox>
                                    <Checkbox
                                        name="showManagers"
                                        label="Manager"
                                    ></Checkbox>
                                    <Checkbox
                                        name="showAdmins"
                                        label="Admin"
                                    ></Checkbox>
                                    <Checkbox
                                        name="showUnassigned"
                                        label="Unassigned"
                                    ></Checkbox>
                                </CheckboxList>
                            </Form>
                        </Formik>
                    </div>
                }
                headers={
                    <>
                        <ColumnHeader
                            header="Name"
                            sortKey="firstName"
                            listService={listUsers}
                        ></ColumnHeader>
                        <ColumnHeader
                            header="Email"
                            sortKey="email"
                            listService={listUsers}
                        ></ColumnHeader>
                        <ColumnHeader
                            header="Phone"
                            sortKey="phone"
                            listService={listUsers}
                        ></ColumnHeader>
                        <ColumnHeader
                            header="Role"
                            sortKey="role"
                            listService={listUsers}
                        ></ColumnHeader>
                        <ColumnHeader
                            header="Status"
                            sortKey="status"
                            listService={listUsers}
                        ></ColumnHeader>
                        <ColumnHeader header="Actions"></ColumnHeader>
                    </>
                }
                rows={
                    <>
                        {listUsers?.rows?.map((row) => (
                            <TableRow
                                key={row.userId}
                                clickHandler={() =>
                                    router.push(`users/${row.userId}`)
                                }
                            >
                                <Column>
                                    <div>
                                        {row.firstName} {row.lastName}
                                    </div>
                                    <div className="key-display">
                                        {row.userId}
                                    </div>
                                </Column>
                                <Column data={row.email}></Column>
                                <Column data={row.phone}></Column>
                                <Column data={row.role}></Column>
                                <Column data={row.status}></Column>
                                <Column>
                                    <div style={{ display: 'flex' }}>
                                        <div
                                            style={{
                                                marginRight: '2rem'
                                            }}
                                        >
                                            <Button
                                                appearance={
                                                    ButtonAppearance.Icon
                                                }
                                                clickHandler={(event) => {
                                                    event.stopPropagation();
                                                    showModal(
                                                        <CreateEditUserModal
                                                            user={row}
                                                            onSubmit={
                                                                listUsers.dispatch
                                                            }
                                                        ></CreateEditUserModal>
                                                    );
                                                }}
                                            >
                                                <PencilAltIcon></PencilAltIcon>
                                            </Button>
                                        </div>

                                        <Button
                                            appearance={ButtonAppearance.Icon}
                                            linkColor="red"
                                            clickHandler={(event) => {
                                                event.stopPropagation();
                                                showModal(
                                                    <DeleteUserModal
                                                        user={row}
                                                        onSubmit={
                                                            listUsers.dispatch
                                                        }
                                                    ></DeleteUserModal>
                                                );
                                            }}
                                        >
                                            <MinusCircleIcon></MinusCircleIcon>
                                        </Button>
                                    </div>
                                </Column>
                            </TableRow>
                        ))}
                    </>
                }
            ></Table>
        </AdminLayout>
    );
}
