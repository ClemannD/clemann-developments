import { PlusIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SeasonSummaryDto } from '../../../api-services/manager/dashboard/getSeasonsSummary.service';
import Pill, {
    PillColor
} from '../../../components/ui-elements/pill/pill.component';
import useModal from '../../../hooks/useModal';
import { MangerDashboardSelectedSeasonContext } from '../../../pages/manager';
import styles from './dashboard-seasons.module.scss';
import StartNewSeasonModal from './start-new-season.modal';

export type DashboardSeasonsProps = {
    seasons: SeasonSummaryDto[];
    refreshSeasonsSummary: () => void;
};

export default function DashboardSeasons({
    seasons,
    refreshSeasonsSummary
}: DashboardSeasonsProps) {
    const addSeasonCardRef = useRef<HTMLDivElement>(null);

    const selectedSeason = useContext(MangerDashboardSelectedSeasonContext);
    const { showModal } = useModal();

    useEffect(() => {
        addSeasonCardRef.current?.scrollIntoView();
    }, []);

    return (
        <div>
            <h3>Seasons</h3>
            <div className={styles.seasonsViewport}>
                {!seasons.length ? (
                    <div
                        className={`${styles.seasonCard} ${styles.noSeasons} actionableBox`}
                    >
                        <p>
                            This league has no seasons. Add one to get started.
                        </p>
                    </div>
                ) : (
                    seasons?.map((season) => (
                        <div
                            key={season.seasonId}
                            className={`cardBox actionable ${
                                styles.seasonCard
                            } ${
                                selectedSeason.selectedSeason?.seasonId ===
                                season.seasonId
                                    ? styles.selected
                                    : ''
                            }`}
                            onClick={() => {
                                selectedSeason.setSelectedSeason(season);
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1.5rem'
                                }}
                            >
                                <h5>Season {season.seasonNumber}</h5>
                                {season.isCurrentSeason && (
                                    <Pill
                                        color={PillColor.Green}
                                        lightFont={true}
                                    >
                                        Active
                                    </Pill>
                                )}
                            </div>
                            <div
                                className="row"
                                style={{ marginBottom: '1rem' }}
                            >
                                <div className="col-6">
                                    <Pill
                                        color={PillColor.OffWhite}
                                        lightFont={false}
                                    >
                                        Start Date
                                    </Pill>
                                    <p
                                        style={{
                                            marginTop: '0.5rem',
                                            marginLeft: '0.8rem'
                                        }}
                                    >
                                        {season.seasonStartDate
                                            ? new Date(
                                                  season.seasonStartDate
                                              ).toLocaleDateString()
                                            : '–'}
                                    </p>
                                </div>
                                <div className="col-6">
                                    <Pill
                                        color={PillColor.OffWhite}
                                        lightFont={false}
                                    >
                                        End Date
                                    </Pill>
                                    <p
                                        style={{
                                            marginTop: '0.5rem',
                                            marginLeft: '0.8rem'
                                        }}
                                    >
                                        {season.seasonEndDate
                                            ? new Date(
                                                  season.seasonEndDate
                                              ).toLocaleDateString()
                                            : '–'}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Pill
                                        color={PillColor.OffWhite}
                                        lightFont={false}
                                    >
                                        # of Weeks
                                    </Pill>
                                    <p
                                        style={{
                                            marginTop: '0.5rem',
                                            marginLeft: '0.8rem'
                                        }}
                                    >
                                        {season.weekSummaries.length}
                                    </p>
                                </div>
                            </div>

                            <div className={styles.summaryDataRow}></div>
                        </div>
                    ))
                )}
                <div
                    ref={addSeasonCardRef}
                    className={`cardBox actionable ${styles.seasonCard} ${styles.addSeason}`}
                    onClick={() =>
                        showModal(
                            <StartNewSeasonModal
                                lastSeasonNumber={
                                    seasons[seasons.length - 1]?.seasonNumber ||
                                    0
                                }
                                onSubmit={refreshSeasonsSummary}
                            ></StartNewSeasonModal>
                        )
                    }
                >
                    <h5>Start New Season</h5>
                    <PlusIcon></PlusIcon>
                </div>
            </div>
        </div>
    );
}
