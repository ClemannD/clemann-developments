import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import { useModal } from '@clemann-developments/react/hooks/use-modal';
import { UserRemoveIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useGetLeague from '../../../api-services/admin/leagues/getLeague.service';
import Card from '../../../components/cards/card/card.component';
import AdminLayout from '../../../components/layouts/admin-layout/admin-layout.component';
import Loading from '../../../components/navigation/loading/loading.component';
import Table, {
    Column,
    ColumnHeader,
    TableRow
} from '../../../components/tables/table.component';
import DataPoint from '../../../components/ui-elements/data-point/data-point.component';
import PageHeader from '../../../components/ui-elements/page-header/page-header.component';
import AddUserToLeagueModal from '../../../page-components/admin/leagues/league/add-user-to-league.modal';
import RemoveUserFromLeagueModal from '../../../page-components/admin/leagues/league/remove-user-from-league.modal';
import UpdateMemberType from '../../../page-components/admin/leagues/league/update-league-member-type.modal';
import styles from '../../../styles/pages/admin/league.module.scss';

export default function LeaguePage() {
    const router = useRouter();
    const { showModal } = useModal();

    const getLeague = useGetLeague();

    useEffect(() => {
        fetchLeague();
    }, [router.query]);

    const fetchLeague = () => {
        getLeague.mutate({
            leagueId: router.query.leagueId as string
        });
    };

    return (
        <AdminLayout>
            <div>
                <PageHeader
                    subHeader="League"
                    header={getLeague?.data?.league?.name}
                    backButtonText="All Leagues"
                    backButtonHandler={() => router.back()}
                ></PageHeader>
                {getLeague?.data?.league && !getLeague.isLoading ? (
                    <div className="row">
                        <div
                            className="col-12 "
                            style={{ marginBottom: '2rem' }}
                        >
                            <Card header="League Info">
                                <div className={styles.leagueInfo}>
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <DataPoint
                                                label="Location"
                                                style={{ marginBottom: '2rem' }}
                                            >
                                                {getLeague?.data?.league?.city},{' '}
                                                {getLeague?.data?.league?.state}
                                            </DataPoint>
                                        </div>

                                        <div className="col-12 col-lg-6">
                                            <DataPoint
                                                label="League Id"
                                                style={{ marginBottom: '2rem' }}
                                            >
                                                {
                                                    getLeague?.data?.league
                                                        ?.leagueId
                                                }
                                            </DataPoint>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <DataPoint
                                                label="Created At"
                                                style={{ marginBottom: '2rem' }}
                                            >
                                                {
                                                    getLeague?.data?.league
                                                        ?.createdAt
                                                }
                                            </DataPoint>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <DataPoint
                                                label="Last Updated"
                                                style={{ marginBottom: '2rem' }}
                                            >
                                                {
                                                    getLeague?.data?.league
                                                        ?.updatedAt
                                                }
                                            </DataPoint>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-12 ">
                            <Card
                                header={
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div>League Players</div>
                                        <Button
                                            appearance={
                                                ButtonAppearance.Secondary
                                            }
                                            clickHandler={() => {
                                                showModal(
                                                    <AddUserToLeagueModal
                                                        league={
                                                            getLeague?.data
                                                                ?.league
                                                        }
                                                        onSubmit={fetchLeague}
                                                    ></AddUserToLeagueModal>
                                                );
                                            }}
                                        >
                                            Add Player
                                        </Button>
                                    </div>
                                }
                            >
                                {getLeague?.data?.league.userToLeague.length ? (
                                    <Table
                                        showCard={false}
                                        headers={
                                            <>
                                                <ColumnHeader header="Name"></ColumnHeader>
                                                <ColumnHeader header="Member Type"></ColumnHeader>
                                                <ColumnHeader header="Invite Code"></ColumnHeader>
                                                <ColumnHeader header="Remove"></ColumnHeader>
                                            </>
                                        }
                                        rows={
                                            <>
                                                {getLeague?.data?.league.userToLeague?.map(
                                                    (row) => (
                                                        <TableRow
                                                            key={row.userId}
                                                        >
                                                            <Column>
                                                                <Link
                                                                    href={`/admin/users/${row.userId}`}
                                                                >
                                                                    {`${row.user.firstName}
                                                                        ${row.user.lastName}`}
                                                                </Link>
                                                                <div className="key-display">
                                                                    {row.userId}
                                                                </div>
                                                            </Column>
                                                            <Column>
                                                                <Button
                                                                    clickHandler={() => {
                                                                        showModal(
                                                                            <UpdateMemberType
                                                                                onSubmit={
                                                                                    fetchLeague
                                                                                }
                                                                                userToLeague={
                                                                                    row
                                                                                }
                                                                            ></UpdateMemberType>
                                                                        );
                                                                    }}
                                                                    appearance={
                                                                        ButtonAppearance.Link
                                                                    }
                                                                >
                                                                    {
                                                                        row.leagueMemberType
                                                                    }
                                                                </Button>
                                                            </Column>
                                                            <Column
                                                                data={
                                                                    row.inviteCode
                                                                }
                                                            ></Column>
                                                            <Column>
                                                                <Button
                                                                    linkColor={
                                                                        'red'
                                                                    }
                                                                    appearance={
                                                                        ButtonAppearance.Icon
                                                                    }
                                                                    clickHandler={() => {
                                                                        showModal(
                                                                            <RemoveUserFromLeagueModal
                                                                                league={
                                                                                    getLeague
                                                                                        .data
                                                                                        ?.league
                                                                                }
                                                                                user={
                                                                                    row.user
                                                                                }
                                                                                onSubmit={() => {
                                                                                    fetchLeague();
                                                                                }}
                                                                            ></RemoveUserFromLeagueModal>
                                                                        );
                                                                    }}
                                                                >
                                                                    <UserRemoveIcon></UserRemoveIcon>
                                                                </Button>
                                                            </Column>
                                                        </TableRow>
                                                    )
                                                )}
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
                                        No players
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>
                ) : (
                    <Loading></Loading>
                )}
            </div>
        </AdminLayout>
    );
}
