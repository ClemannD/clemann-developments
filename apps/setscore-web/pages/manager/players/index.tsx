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
import React, { useContext } from 'react';
import useListPlayers from '../../../api-services/manager/players/listPlayers.service';
import OnFormChangeHandler from '../../../components/forms/on-form-change-handler.component';
import ManagerLayout from '../../../components/layouts/manager-layout/manager-layout.component';
import Table, {
    Column,
    ColumnHeader,
    TableRow
} from '../../../components/tables/table.component';
import PageHeader from '../../../components/ui-elements/page-header/page-header.component';
import CurrentLeagueContext from '../../../context/currentLeague.context';
import CreateEditPlayerModal from '../../../page-components/manager/players/create-edit-player.modal';
import RemoveDeactivatePlayerModal from '../../../page-components/manager/players/remove-deactivate-player.modal';

export default function PlayersPage() {
    const currentLeague = useContext(CurrentLeagueContext);
    const listPlayers = useListPlayers({
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
            showManagers: true,
            showSubs: true,
            showInactives: true
        }
    });
    const { showModal } = useModal();
    const { mediumBelow } = useWindowSize();

    return (
        <ManagerLayout>
            <PageHeader
                subHeader={currentLeague?.name}
                header="Players"
                actionButtonText={
                    <>
                        <PlusCircleIcon
                            height="1.8rem"
                            style={{
                                marginRight: mediumBelow ? '0' : '1rem'
                            }}
                        ></PlusCircleIcon>
                        {!mediumBelow && 'Add Player'}
                    </>
                }
                actionButtonHandler={() => {
                    showModal(
                        <CreateEditPlayerModal
                            onSubmit={listPlayers.dispatch}
                        ></CreateEditPlayerModal>
                    );
                }}
            ></PageHeader>
            <Table
                isLoading={listPlayers.apiService.isLoading}
                noData={listPlayers?.rows?.length === 0}
                filters={
                    <div>
                        <Formik
                            initialValues={{
                                showRegistered: true,
                                showPlaceholders: true,
                                showReplaced: true,

                                showPlayers: true,
                                showManagers: true,
                                showSubs: true,
                                showInactives: true
                            }}
                            onSubmit={(_) => {}}
                        >
                            <Form className="filtersForm">
                                <OnFormChangeHandler
                                    onChange={(values) => {
                                        listPlayers.handleFilter(values);
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
                                <CheckboxList
                                    label="Member Type"
                                    style={{ marginRight: '2rem' }}
                                >
                                    <Checkbox
                                        name="showPlayers"
                                        label="Player"
                                    ></Checkbox>
                                    <Checkbox
                                        name="showManagers"
                                        label="Manager"
                                    ></Checkbox>
                                    <Checkbox
                                        name="showSubs"
                                        label="Subs"
                                    ></Checkbox>
                                    <Checkbox
                                        name="showInactives"
                                        label="Inactive"
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
                            listService={listPlayers}
                        ></ColumnHeader>
                        <ColumnHeader header="Email"></ColumnHeader>
                        <ColumnHeader header="Phone"></ColumnHeader>
                        <ColumnHeader
                            header="Member Type"
                            sortKey="leagueMemberType"
                            listService={listPlayers}
                        ></ColumnHeader>
                        <ColumnHeader header="Invite Code"></ColumnHeader>
                        <ColumnHeader
                            header="Status"
                            sortKey="status"
                            listService={listPlayers}
                        ></ColumnHeader>
                        <ColumnHeader header="Edit"></ColumnHeader>
                        <ColumnHeader header="Remove"></ColumnHeader>
                    </>
                }
                rows={
                    <>
                        {listPlayers.rows?.map((row) => (
                            <TableRow key={row.userId}>
                                <Column>
                                    <div>
                                        {row.user.firstName} {row.user.lastName}
                                    </div>
                                </Column>
                                <Column data={row.user.email}></Column>
                                <Column data={row.user.phone}></Column>
                                <Column data={row.leagueMemberType}></Column>
                                <Column data={row.inviteCode}></Column>
                                <Column data={row.user.status}></Column>
                                <Column>
                                    <Button
                                        appearance={ButtonAppearance.Icon}
                                        clickHandler={() => {
                                            showModal(
                                                <CreateEditPlayerModal
                                                    userToLeague={row}
                                                    onSubmit={
                                                        listPlayers.dispatch
                                                    }
                                                ></CreateEditPlayerModal>
                                            );
                                        }}
                                    >
                                        <PencilAltIcon></PencilAltIcon>
                                    </Button>
                                </Column>
                                <Column>
                                    <Button
                                        appearance={ButtonAppearance.Icon}
                                        linkColor="red"
                                        clickHandler={() => {
                                            showModal(
                                                <RemoveDeactivatePlayerModal
                                                    userToLeague={row}
                                                    onSubmit={
                                                        listPlayers.dispatch
                                                    }
                                                ></RemoveDeactivatePlayerModal>
                                            );
                                        }}
                                    >
                                        <MinusCircleIcon></MinusCircleIcon>
                                    </Button>
                                </Column>
                            </TableRow>
                        ))}
                    </>
                }
            ></Table>
        </ManagerLayout>
    );
}
