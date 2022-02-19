import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import { useModal } from '@clemann-developments/react/hooks/use-modal';
import React, { createContext, useEffect, useState } from 'react';
import useGetSeasonsSummary, {
    SeasonSummaryDto
} from '../../api-services/manager/dashboard/getSeasonsSummary.service';
import ManagerLayout from '../../components/layouts/manager-layout/manager-layout.component';
import Loading from '../../components/navigation/loading/loading.component';
import PageHeader from '../../components/ui-elements/page-header/page-header.component';
import useCurrentUser from '../../hooks/useCurrentUser';
import DashboardSeasons from '../../page-components/manager/dashboard/dashboard-seasons.component';
import DashboardWeeks from '../../page-components/manager/dashboard/dashboard-weeks.component';
import EditNotesModal from '../../page-components/manager/dashboard/edit-notes.modal';

export type MangerDashboardSelectedSeasonContextType = {
    selectedSeason: SeasonSummaryDto;
    setSelectedSeason: (season: SeasonSummaryDto) => void;
};

export const MangerDashboardSelectedSeasonContext =
    createContext<MangerDashboardSelectedSeasonContextType>({
        selectedSeason: null,
        setSelectedSeason: (season) => {}
    });

export default function Home() {
    const { currentLeague, getCurrentUser } = useCurrentUser();
    const { showModal, closeModal } = useModal();
    const getSeasonsSummary = useGetSeasonsSummary();
    const [selectedSeason, setSelectedSeason] =
        useState<SeasonSummaryDto>(null);

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        getSeasonsSummary.mutate({});
    }, []);

    useEffect(() => {
        setSelectedSeason(
            getSeasonsSummary.data?.seasons[
                getSeasonsSummary.data?.seasons.length - 1
            ]
        );
        setInitialized(!!getSeasonsSummary.data);
    }, [getSeasonsSummary.data]);

    return (
        <ManagerLayout>
            <PageHeader
                subHeader="Manager Dashboard"
                header={currentLeague?.name}
            ></PageHeader>

            {currentLeague && (
                <div style={{ marginBottom: '3em' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}
                    >
                        <h3>League Notes </h3>
                        <Button
                            appearance={ButtonAppearance.Transparent}
                            clickHandler={() => {
                                showModal(
                                    <EditNotesModal
                                        leagueNotes={currentLeague.notes}
                                        onSubmit={() => {
                                            getCurrentUser.mutate({});
                                            closeModal();
                                        }}
                                    ></EditNotesModal>
                                );
                            }}
                            style={{
                                marginLeft: '1rem'
                            }}
                        >
                            Edit
                        </Button>
                    </div>
                    <p style={{ whiteSpace: 'pre-line' }}>
                        {currentLeague.notes || 'No notes set'}
                    </p>
                </div>
            )}
            {getSeasonsSummary.data?.seasons ? (
                <MangerDashboardSelectedSeasonContext.Provider
                    value={{
                        selectedSeason: selectedSeason,
                        setSelectedSeason: (season) => {
                            setSelectedSeason(season);
                        }
                    }}
                >
                    <DashboardSeasons
                        seasons={getSeasonsSummary.data?.seasons}
                        refreshSeasonsSummary={() => {
                            getSeasonsSummary.mutate({});
                        }}
                    ></DashboardSeasons>
                    <DashboardWeeks
                        refreshSeasonsSummary={() => {
                            getSeasonsSummary.mutate({});
                        }}
                    ></DashboardWeeks>
                </MangerDashboardSelectedSeasonContext.Provider>
            ) : (
                <Loading></Loading>
            )}
        </ManagerLayout>
    );
}
