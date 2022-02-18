import { useAuthGuard } from '@clemann-developments/react/hooks/next/use-auth-guard';
import { useWindowSize } from '@clemann-developments/react/hooks/use-window-dimensions';
import React, { useState } from 'react';
import { UserRole } from '../../../api-services/entities/user.entity';
import ScrollContext from '../../../context/scroll.context';
import useCurrentLeagueGuard from '../../../hooks/useCurrentLeagueGuard';
import useCurrentUser from '../../../hooks/useCurrentUser';
import useRegisteredGuard from '../../../hooks/useRegisteredGuard';
import useRoleGuard from '../../../hooks/useRoleGuard';
import LoadingScreen from '../../navigation/loading-screen/loading-screen';
import MobileNav from '../../navigation/mobile-nav/mobile-nav.component';
import NavItem from '../../navigation/nav-item/nav-item.component';
import SideNav from '../../navigation/side-nav/side-nav.component';
import ScoreCard from '../../ui-elements/score-card/score-card.component';
import styles from './player-layout.module.scss';

export default function PlayerLayout(props) {
    const { isAuthenticated } = useAuthGuard();
    const { currentLeague } = useCurrentUser();

    useCurrentLeagueGuard();
    const checked = useRoleGuard([
        UserRole.Player,
        UserRole.Manager,
        UserRole.Admin
    ]);
    const { mediumBelow } = useWindowSize();
    useRegisteredGuard();

    const [viewportScrollY, setViewportScrollY] = useState<number>(0);

    if (isAuthenticated && checked && currentLeague) {
        return (
            <div className={styles.playerLayout}>
                {mediumBelow ? (
                    <MobileNav>
                        <NavItem
                            name="Home"
                            route="/player"
                            icon="home"
                            isBase
                        ></NavItem>
                        <NavItem
                            name="Lineup"
                            route="/player/lineup"
                            icon="table"
                            isBase
                        ></NavItem>
                    </MobileNav>
                ) : (
                    <SideNav>
                        <NavItem
                            name="Home"
                            route="/player"
                            icon="home"
                            isBase
                        ></NavItem>
                        <NavItem
                            name="Lineup"
                            route="/player/lineup"
                            icon="table"
                            isBase
                        ></NavItem>
                    </SideNav>
                )}
                <div
                    id="playerViewport"
                    className={styles.viewport}
                    style={{ marginTop: mediumBelow ? '6rem' : '0' }}
                    onScroll={(event: any) => {
                        setViewportScrollY(event.target.scrollTop);
                    }}
                >
                    <ScrollContext.Provider
                        value={{
                            scrollY: viewportScrollY
                        }}
                    >
                        {props.children(viewportScrollY)}
                    </ScrollContext.Provider>
                </div>
                <ScoreCard></ScoreCard>
            </div>
        );
    }
    return <LoadingScreen></LoadingScreen>;
}
