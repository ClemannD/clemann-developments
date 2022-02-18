import { useModal } from '@clemann-developments/react/hooks/use-modal';
import { useWindowSize } from '@clemann-developments/react/hooks/use-window-dimensions';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Date from '../../../components/ui-elements/date/date.component';
import Pill, {
    PillColor
} from '../../../components/ui-elements/pill/pill.component';
import { MangerDashboardSelectedSeasonContext } from '../../../pages/manager';
import AddWeekModal from './add-week.modal';
import styles from './dashboard-weeks.module.scss';

export default function DashboardWeeks({
    refreshSeasonsSummary
}: {
    refreshSeasonsSummary: () => void;
}) {
    const { showModal, closeModal } = useModal();
    const router = useRouter();
    const window = useWindowSize();
    const selectedSeasonContext = useContext(
        MangerDashboardSelectedSeasonContext
    );

    const navigateToWeek = (weekId: string) => {
        router.push(`/manager/week/${weekId}`);
    };

    return (
        <div className={styles.dashboardWeeks}>
            {selectedSeasonContext.selectedSeason ? (
                <div>
                    <h3>
                        Season{' '}
                        {selectedSeasonContext?.selectedSeason?.seasonNumber}{' '}
                        Weeks
                    </h3>
                    <div className={styles.weeksViewport}>
                        {!selectedSeasonContext.selectedSeason.weekSummaries
                            .length ? (
                            <div
                                className={`${styles.weekRow} ${styles.noWeeksRow}`}
                            >
                                <p>
                                    This season has no weeks. Add one to get
                                    started.
                                </p>
                            </div>
                        ) : (
                            selectedSeasonContext.selectedSeason.weekSummaries.map(
                                (weekSummary) => (
                                    <div
                                        className={`${styles.weekRow} cardBox actionable`}
                                        key={weekSummary.weekId}
                                        onClick={() =>
                                            navigateToWeek(weekSummary.weekId)
                                        }
                                    >
                                        <h5
                                            className={styles.weekNumber}
                                            style={{
                                                width: '10rem'
                                            }}
                                        >
                                            Week {weekSummary.weekNumber}
                                        </h5>

                                        {!window.mediumBelow && (
                                            <>
                                                <div
                                                    style={{
                                                        width: '8rem'
                                                    }}
                                                >
                                                    <Pill
                                                        color={
                                                            PillColor.OffWhite
                                                        }
                                                    >
                                                        {weekSummary.isCurrentWeek
                                                            ? 'Playing on'
                                                            : 'Played on'}
                                                    </Pill>
                                                </div>
                                                <div
                                                    style={{
                                                        width: '12rem'
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            marginLeft: '1rem',
                                                            lineHeight: '1.6rem'
                                                        }}
                                                    >
                                                        <Date
                                                            date={
                                                                weekSummary.playingOnDate
                                                            }
                                                        ></Date>
                                                    </p>
                                                </div>

                                                <Pill
                                                    color={PillColor.OffWhite}
                                                >
                                                    Courts
                                                </Pill>
                                                <p
                                                    style={{
                                                        marginLeft: '1rem',
                                                        lineHeight: '1.6rem'
                                                    }}
                                                >
                                                    {weekSummary.courtCount}
                                                </p>
                                            </>
                                        )}

                                        {weekSummary.isCurrentWeek && (
                                            <div style={{ marginLeft: 'auto' }}>
                                                <Pill
                                                    color={PillColor.Green}
                                                    lightFont={true}
                                                >
                                                    Active
                                                </Pill>
                                            </div>
                                        )}

                                        <ChevronRightIcon
                                            height="2rem"
                                            style={{
                                                marginLeft:
                                                    weekSummary.isCurrentWeek
                                                        ? '2rem'
                                                        : 'auto'
                                            }}
                                        ></ChevronRightIcon>
                                    </div>
                                )
                            )
                        )}

                        <div
                            className={`cardBox actionable ${styles.weekRow} ${styles.addWeekRow}`}
                            onClick={() =>
                                showModal(
                                    <AddWeekModal
                                        selectedSeason={
                                            selectedSeasonContext.selectedSeason
                                        }
                                        onSubmit={async () => {
                                            refreshSeasonsSummary();
                                            closeModal();
                                        }}
                                    ></AddWeekModal>
                                )
                            }
                        >
                            <p>Add Week</p>
                            <PlusIcon></PlusIcon>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.noSelectedSeasonWrapper}>
                    <div className={styles.noSelectedSeasonBox}>
                        Select a season to view weeks.
                    </div>
                </div>
            )}
        </div>
    );
}
