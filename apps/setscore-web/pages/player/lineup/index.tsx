import React, { useEffect } from 'react';
import useGetLineup from '../../../api-services/player/lineup/getLineup.service';
import PlayerLayout from '../../../components/layouts/player-layout/player-layout.component';
import useWindowSize from '../../../hooks/useWindowDimensions';
import PlayerLineup from '../../../page-components/player/lineup/player-lineup.component';
import PlayerLineupMobile from '../../../page-components/player/lineup/player-lineup.mobile.component';

export default function PlayerLineupPage() {
    const getLineup = useGetLineup();
    const { mediumBelow } = useWindowSize();

    useEffect(() => {
        getLineup.mutate({});
    }, []);

    return (
        <PlayerLayout>
            {(scrollY) =>
                mediumBelow ? (
                    <PlayerLineupMobile
                        getLineup={getLineup}
                        scrollY={scrollY}
                    ></PlayerLineupMobile>
                ) : (
                    <PlayerLineup getLineup={getLineup}></PlayerLineup>
                )
            }
        </PlayerLayout>
    );
}
