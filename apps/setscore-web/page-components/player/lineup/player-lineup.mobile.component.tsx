import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import ordinal from 'ordinal';
import React, { useEffect, useState } from 'react';
import { UseMutationResult } from 'react-query';
import {
    GetLineupRequest,
    GetLineupResponse
} from '../../../api-services/player/lineup/getLineup.service';
import LineupMetaData from '../../../components/ui-elements/lineup-meta-data/lineup-meta-data.component';
import PageHeaderMobile from '../../../components/ui-elements/page-header/page-header.mobile.component';
import PlayerCourtSkeleton from '../../../components/ui-elements/player-court/player-court-skeleton.component';
import PlayerCourt from '../../../components/ui-elements/player-court/player-court.component';
import PullToRefresh from '../../../components/ui-elements/pull-to-refresh/pull-to-refresh.component';
import useCurrentUser from '../../../hooks/useCurrentUser';
import LineupMobileWeekSelector from './lineup-mobile-week-selector.components';

export type PlayerLineupMobileProps = {
    getLineup: UseMutationResult<
        GetLineupResponse,
        any,
        GetLineupRequest,
        unknown
    >;
    scrollY: number;
};

export default function PlayerLineupMobile({
    getLineup,
    scrollY
}: PlayerLineupMobileProps) {
    const { currentLeague } = useCurrentUser();
    const [headerIsOpen, setHeaderIsOpen] = useState(false);
    const [seasonNumber, setSeasonNumber] = useState<number>();
    const [weekNumber, setWeekNumber] = useState<number>();

    useEffect(() => {
        if (getLineup.data?.lineup) {
            setSeasonNumber(getLineup.data.lineup.seasonNumber);
            setWeekNumber(getLineup.data.lineup.weekNumber);
        }
    }, [
        getLineup.data?.lineup.seasonNumber,
        getLineup.data?.lineup.weekNumber
    ]);

    const refresh = async () => {
        await getLineup.mutateAsync({
            seasonNumber,
            weekNumber
        });
    };

    return (
        <>
            <PageHeaderMobile
                header="Lineup"
                subHeader={
                    headerIsOpen || !(scrollY > 30)
                        ? currentLeague?.name || '-'
                        : null
                }
                collapsed={!headerIsOpen && scrollY > 30}
                expanded={headerIsOpen}
                height={
                    headerIsOpen ? '35rem' : scrollY > 30 ? '7.6rem' : '13.6rem'
                }
                clickHandler={() => setHeaderIsOpen(true)}
                overlayClickHandler={() => setHeaderIsOpen(false)}
            >
                <LineupMetaData
                    seasonNumber={getLineup.data?.lineup.seasonNumber}
                    weekNumber={getLineup.data?.lineup.weekNumber}
                    playingOnDate={getLineup.data?.lineup.playingOnDate}
                    isCurrentWeek={getLineup.data?.lineup.isCurrentWeek}
                    compact={!headerIsOpen && scrollY > 30}
                    justifyLeft
                />
                {headerIsOpen ? (
                    <LineupMobileWeekSelector
                        initialSeasonNumber={
                            getLineup.data?.lineup.seasonNumber
                        }
                        initialWeekNumber={getLineup.data?.lineup.weekNumber}
                        weekCountsBySeason={
                            getLineup.data?.lineup.weekCountsBySeason
                        }
                        onSubmit={async (newSeasonNumber, newWeekNumber) => {
                            await getLineup.mutateAsync({
                                seasonNumber: newSeasonNumber,
                                weekNumber: newWeekNumber
                            });

                            setHeaderIsOpen(false);
                        }}
                    />
                ) : (
                    <p
                        className="grayDarker smaller"
                        style={{
                            textAlign: 'center',
                            marginTop: '1rem'
                        }}
                    >
                        Tap to change week
                    </p>
                )}
            </PageHeaderMobile>

            <div
                style={{
                    marginTop: '12rem',
                    marginBottom: '12rem',
                    paddingTop: '1.5rem'
                }}
            >
                <PullToRefresh onRefresh={refresh}>
                    <div className="row">
                        {getLineup.data?.lineup ? (
                            getLineup.data?.lineup.courts.map((court) => (
                                <div
                                    key={court.courtId}
                                    className="col-12 col-md-4 col-lg-3"
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '2rem',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        <div>
                                            <h4 className="bold">
                                                Court {court.courtNumber}
                                            </h4>
                                        </div>
                                        <Pill
                                            color={PillColor.Black}
                                            lightFont={true}
                                        >
                                            {court.courtPosition === 1
                                                ? 'Top Court'
                                                : court.courtPosition ===
                                                  getLineup.data?.lineup.courts
                                                      .length
                                                ? 'Bottom Court'
                                                : `${ordinal(
                                                      court.courtPosition
                                                  )} Court`}
                                        </Pill>
                                    </div>
                                    <PlayerCourt court={court} />
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="col-12 col-md-4 col-lg-3">
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '2rem',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        <div>
                                            <h4 className="bold">Court</h4>
                                        </div>
                                        <Pill
                                            color={PillColor.Black}
                                            lightFont={true}
                                        >
                                            Top Court
                                        </Pill>
                                    </div>
                                    <PlayerCourtSkeleton></PlayerCourtSkeleton>
                                </div>
                                <div className="col-12 col-md-4 col-lg-3">
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '2rem',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        <div>
                                            <h4 className="bold">Court</h4>
                                        </div>
                                        <Pill
                                            color={PillColor.Black}
                                            lightFont={true}
                                        >
                                            2nd Court
                                        </Pill>
                                    </div>
                                    <PlayerCourtSkeleton></PlayerCourtSkeleton>
                                </div>
                            </>
                        )}
                    </div>
                </PullToRefresh>
            </div>
        </>
    );
}
