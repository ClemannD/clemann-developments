import {
    Button,
    ButtonSize,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import {
    Loading,
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useRouter } from 'next/router';
import ordinal from 'ordinal';
import React, { useContext, useEffect, useState } from 'react';
import { CourtDto } from '../../../api-services/player/models';
import LineupMetaData from '../../../components/ui-elements/lineup-meta-data/lineup-meta-data.component';
import PageHeaderMobile from '../../../components/ui-elements/page-header/page-header.mobile.component';
import PlayerCourt from '../../../components/ui-elements/player-court/player-court.component';
import ScrollContext from '../../../context/scroll.context';
import useCurrentUser from '../../../hooks/useCurrentUser';

export type PlayerHomeMobileProps = {
    weekNumber: number;
    seasonNumber: number;
    playingOnDate: Date;
    court: CourtDto;
    courtCount: number;
    loading: boolean;
};

export default function PlayerHomeMobile({
    weekNumber,
    seasonNumber,
    playingOnDate,
    court,
    courtCount,
    loading
}: PlayerHomeMobileProps) {
    const { currentLeague } = useCurrentUser();
    const [isCompactHeader, setIsCompactHeader] = useState(false);
    const { scrollY } = useContext(ScrollContext);
    const router = useRouter();

    useEffect(() => {
        if (scrollY > 30) {
            setIsCompactHeader(true);
        } else {
            setIsCompactHeader(false);
        }
    }, [scrollY]);

    return (
        <>
            <PageHeaderMobile
                header={currentLeague?.name}
                subHeader={
                    !isCompactHeader
                        ? `${currentLeague?.city}, ${currentLeague?.state}`
                        : null
                }
                collapsed={isCompactHeader}
                height={isCompactHeader ? '5.4rem' : '11.4rem'}
            >
                <LineupMetaData
                    seasonNumber={seasonNumber}
                    weekNumber={weekNumber}
                    playingOnDate={playingOnDate}
                    compact={isCompactHeader}
                    justifyLeft
                />
            </PageHeaderMobile>

            <div
                style={{
                    marginTop: '12rem',
                    marginBottom: '12rem',
                    paddingTop: '1.5rem'
                }}
            >
                <h4
                    className="bold"
                    style={{
                        marginBottom: '0.5rem'
                    }}
                >
                    League Notes
                </h4>
                <p className="grayDarkest lineBreaks">{currentLeague?.notes}</p>
                {loading ? (
                    <Loading></Loading>
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
                                    : `${ordinal(court.courtPosition)} Court`}
                            </Pill>
                        </div>
                        <PlayerCourt court={court} compact></PlayerCourt>
                    </>
                ) : (
                    <h4
                        style={{
                            textAlign: 'center',
                            marginTop: '6rem'
                        }}
                    >
                        You are not currently placed on a court for this week.
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
        </>
    );
}
