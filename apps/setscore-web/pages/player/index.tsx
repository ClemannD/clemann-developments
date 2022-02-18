import { useEventBus } from '@clemann-developments/react/hooks/use-event-bus';
import { useWindowSize } from '@clemann-developments/react/hooks/use-window-dimensions';
import React, { useEffect } from 'react';
import useGetCurrentWeek from '../../api-services/player/home/getCurrentWeek.service';
import PlayerLayout from '../../components/layouts/player-layout/player-layout.component';
import { EventBusActionTypes } from '../../constants/event-bus-action-types';
import PlayerHome from '../../page-components/player/home/player-home.component';
import PlayerHomeMobile from '../../page-components/player/home/player-home.mobile.component';

export default function PlayerHomePage() {
    const { mediumBelow } = useWindowSize();
    const getCurrentWeek = useGetCurrentWeek();
    const eventBus = useEventBus<EventBusActionTypes>();

    useEffect(() => {
        refresh();

        eventBus.addEventListener(EventBusActionTypes.SCORE_SUBMITTED, refresh);
        return () => {
            eventBus.removeEventListener(
                EventBusActionTypes.SCORE_SUBMITTED,
                refresh
            );
        };
    }, []);

    const refresh = () => {
        getCurrentWeek.mutate({});
    };

    return (
        <PlayerLayout>
            {(_) =>
                mediumBelow ? (
                    <PlayerHomeMobile
                        court={getCurrentWeek.data?.court}
                        weekNumber={getCurrentWeek.data?.weekNumber}
                        seasonNumber={getCurrentWeek.data?.seasonNumber}
                        playingOnDate={getCurrentWeek.data?.playingOnDate}
                        courtCount={getCurrentWeek.data?.courtCount}
                        loading={getCurrentWeek.isLoading}
                    />
                ) : (
                    <PlayerHome
                        court={getCurrentWeek.data?.court}
                        weekNumber={getCurrentWeek.data?.weekNumber}
                        seasonNumber={getCurrentWeek.data?.seasonNumber}
                        playingOnDate={getCurrentWeek.data?.playingOnDate}
                        courtCount={getCurrentWeek.data?.courtCount}
                        loading={getCurrentWeek.isLoading}
                    />
                )
            }
        </PlayerLayout>
    );
}
