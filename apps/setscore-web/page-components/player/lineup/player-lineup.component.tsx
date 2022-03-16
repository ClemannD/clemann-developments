import { DropdownButton } from '@clemann-developments/react/components/interaction/dropdown-button';
import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import ordinal from 'ordinal';
import React from 'react';
import { UseMutationResult } from 'react-query';
import {
    GetLineupRequest,
    GetLineupResponse
} from '../../../api-services/player/lineup/getLineup.service';
import LineupMetaData from '../../../components/ui-elements/lineup-meta-data/lineup-meta-data.component';
import PageHeader from '../../../components/ui-elements/page-header/page-header.component';
import PlayerCourt from '../../../components/ui-elements/player-court/player-court.component';
import useCurrentUser from '../../../hooks/useCurrentUser';
import LineupMobileWeekSelector from './lineup-mobile-week-selector.components';

export type PlayerLineupProps = {
    getLineup: UseMutationResult<
        GetLineupResponse,
        any,
        GetLineupRequest,
        unknown
    >;
};
export default function PlayerLineup({ getLineup }: PlayerLineupProps) {
    const { currentLeague } = useCurrentUser();

    return (
        <>
            <PageHeader header="Lineup" subHeader={currentLeague?.name}>
                <LineupMetaData
                    seasonNumber={getLineup.data?.lineup.seasonNumber}
                    weekNumber={getLineup.data?.lineup.weekNumber}
                    playingOnDate={getLineup.data?.lineup.playingOnDate}
                    isCurrentWeek={getLineup.data?.lineup.isCurrentWeek}
                />

                <DropdownButton
                    dropdownButtonText="Change"
                    disabled={!getLineup.data?.lineup}
                >
                    <LineupMobileWeekSelector
                        initialSeasonNumber={
                            getLineup.data?.lineup.seasonNumber
                        }
                        initialWeekNumber={getLineup.data?.lineup.weekNumber}
                        weekCountsBySeason={
                            getLineup.data?.lineup.weekCountsBySeason
                        }
                        onSubmit={async (seasonNumber, weekNumber) => {
                            await getLineup.mutateAsync({
                                seasonNumber,
                                weekNumber
                            });
                        }}
                    ></LineupMobileWeekSelector>
                </DropdownButton>
            </PageHeader>
            {getLineup.data && (
                <div className="row">
                    {getLineup.data?.lineup.courts.map((court) => (
                        <div
                            key={court.courtId}
                            className="col-12 col-lg-6 col-xl-4 "
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
                                <Pill color={PillColor.Black} lightFont={true}>
                                    {court.courtPosition === 1
                                        ? 'Top Court'
                                        : court.courtPosition ===
                                          getLineup.data?.lineup.courts.length
                                        ? 'Bottom Court'
                                        : `${ordinal(
                                              court.courtPosition
                                          )} Court`}
                                </Pill>
                            </div>
                            <PlayerCourt court={court} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
