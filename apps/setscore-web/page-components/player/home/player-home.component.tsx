import {
    Button,
    ButtonSize,
    ButtonAppearance
} from '@clemann-developments/react/component/button';
import { useRouter } from 'next/router';
import ordinal from 'ordinal';
import React from 'react';
import { CourtDto } from '../../../api-services/player/models';
import Card from '../../../components/cards/card/card.component';
import Loading from '../../../components/navigation/loading/loading.component';
import LineupMetaData from '../../../components/ui-elements/lineup-meta-data/lineup-meta-data.component';
import PageHeader from '../../../components/ui-elements/page-header/page-header.component';
import Pill, {
    PillColor
} from '../../../components/ui-elements/pill/pill.component';
import PlayerCourt from '../../../components/ui-elements/player-court/player-court.component';
import useCurrentUser from '../../../hooks/useCurrentUser';

export type PlayerHomeProps = {
    weekNumber: number;
    seasonNumber: number;
    playingOnDate: Date;
    court: CourtDto;
    courtCount: number;
    loading: boolean;
};

export default function PlayerHome({
    weekNumber,
    seasonNumber,
    playingOnDate,
    court,
    courtCount,
    loading
}: PlayerHomeProps) {
    const { currentLeague } = useCurrentUser();
    const router = useRouter();

    return (
        <>
            <PageHeader
                header={currentLeague?.name}
                subHeader={`${currentLeague?.city}, ${currentLeague?.state}`}
            ></PageHeader>

            <div className="row">
                <div className="col-12 col-lg-6 col-xl-4">
                    <Card>
                        <div
                            style={{
                                padding: '2rem'
                            }}
                        >
                            <LineupMetaData
                                seasonNumber={seasonNumber}
                                weekNumber={weekNumber}
                                playingOnDate={playingOnDate}
                                justifyLeft
                            />

                            <h3
                                className="bold"
                                style={{
                                    marginTop: '2rem',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                League Notes
                            </h3>

                            <p className="grayDarkest lineBreaks">
                                {currentLeague?.notes}
                            </p>
                        </div>
                    </Card>
                    {loading ? (
                        <Loading />
                    ) : court ? (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '2rem'
                                }}
                            >
                                <div>
                                    <h4 className="bold">Your Court</h4>
                                    <p
                                        className="body thin spaced"
                                        style={{
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        Court 22
                                    </p>
                                </div>
                                <Pill color={PillColor.Black} lightFont={true}>
                                    {court.courtPosition === 1
                                        ? 'Top Court'
                                        : court.courtPosition === courtCount
                                        ? 'Bottom Court'
                                        : `${ordinal(
                                              court.courtPosition
                                          )} Court`}
                                </Pill>
                            </div>
                            <PlayerCourt court={court} compact></PlayerCourt>
                        </>
                    ) : (
                        <h4
                            style={{
                                textAlign: 'center',
                                marginTop: '2rem'
                            }}
                        >
                            You are not currently placed on a court for this
                            week.
                        </h4>
                    )}
                    <Button
                        size={ButtonSize.Block}
                        appearance={ButtonAppearance.Secondary}
                        style={{
                            marginTop: '2rem'
                        }}
                        clickHandler={() => {
                            router.push('player/lineup');
                        }}
                    >
                        View Full Lineup
                    </Button>
                </div>
            </div>
        </>
    );
}
