import { MinusCircleIcon, PencilAltIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import useDeleteLeague from '../../../api-services/admin/leagues/deleteLeague.service';
import useListLeagues from '../../../api-services/admin/leagues/listLeagues.service';
import {
    SortDirection,
    TakeAll
} from '../../../api-services/common/pagination-and-sort';
import { League } from '../../../api-services/entities/league.entity';
import Button, {
    ButtonAppearance
} from '../../../components/buttons/button.component';
import ModalFooter from '../../../components/modal/modal-footer/modal-footer.component';
import ModalHeader from '../../../components/modal/modal-header/modal-header.component';
import Modal from '../../../components/modal/modal.component';
import Table, {
    Column,
    ColumnHeader,
    TableRow
} from '../../../components/tables/table.component';
import useModal from '../../../hooks/useModal';

export default function LeaguesTable({
    setShowLeagueForm
}: {
    setShowLeagueForm: React.Dispatch<React.SetStateAction<League>>;
}) {
    const router = useRouter();
    const { showModal, closeModal } = useModal();
    const listLeagues = useListLeagues({
        paginationAndSort: {
            skip: 0,
            take: TakeAll,
            sortColumn: 'name',
            sortDirection: SortDirection.Asc
        }
    });
    const deleteLeague = useDeleteLeague();

    const DeleteLeagueModal = ({ row }: { row: League }) => {
        return (
            <Modal>
                <ModalHeader>Delete League</ModalHeader>
                <p>
                    Are you sure you want to delete <b>{row.name}</b>?
                </p>
                <ModalFooter
                    okButtonText="Delete"
                    onOkClick={async () => {
                        try {
                            await deleteLeague.mutateAsync({
                                leagueId: row.leagueId
                            });
                            closeModal();
                            listLeagues.dispatch();
                            toast.success('League successfully deleted');
                        } catch {}
                    }}
                    isDangerButton
                ></ModalFooter>
            </Modal>
        );
    };

    return (
        <Table
            isLoading={listLeagues.apiService.isLoading}
            headers={
                <>
                    <ColumnHeader
                        width="35%"
                        header="Name"
                        sortKey="name"
                        listService={listLeagues}
                    ></ColumnHeader>
                    <ColumnHeader
                        width="30%"
                        header="Location"
                        sortKey="city"
                        listService={listLeagues}
                    ></ColumnHeader>
                    <ColumnHeader width="10%" header="Players"></ColumnHeader>
                    <ColumnHeader width="10%" header="Actions"></ColumnHeader>
                </>
            }
            rows={
                <>
                    {listLeagues?.rows?.map((row) => (
                        <TableRow
                            key={row.leagueId}
                            clickHandler={() =>
                                router.push(`leagues/${row.leagueId}`)
                            }
                        >
                            <Column data={row.name}>
                                <div>{row.name}</div>
                                <div className="key-display">
                                    {row.leagueId}
                                </div>
                            </Column>
                            <Column>
                                <span>
                                    {row.city}, {row.state}
                                </span>
                            </Column>
                            <Column
                                data={row.userToLeague?.length || '0'}
                            ></Column>
                            <Column>
                                <div style={{ display: 'flex' }}>
                                    <div
                                        style={{
                                            marginRight: '2rem'
                                        }}
                                    >
                                        <Button
                                            appearance={ButtonAppearance.Icon}
                                            clickHandler={(event) => {
                                                event.stopPropagation();
                                                setShowLeagueForm(row);
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
                                                <DeleteLeagueModal
                                                    row={row}
                                                ></DeleteLeagueModal>
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
    );
}