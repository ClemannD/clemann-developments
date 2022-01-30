import { useAuth0 } from '@auth0/auth0-react';
import { UserCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { LeagueMemberType } from '../../../api-services/entities/userToLeague.entity';
import useCurrentUser from '../../../hooks/useCurrentUser';
import TennisCourtWithLogo from '../../brand/logo-with-tennis-court/logo-with-tennis-court';
import ScoreCard from '../../ui-elements/score-card/score-card.component';
import styles from './side-nav.module.scss';

export default function SideNav(props) {
    const { user, logout } = useAuth0();
    const { currentLeagueMemberType } = useCurrentUser();
    const router = useRouter();

    const [showScoreCard, setShowScoreCard] = useState(false);

    return (
        <div className={styles.sideNav}>
            <div className={styles.logo}>
                <TennisCourtWithLogo height={40}></TennisCourtWithLogo>
            </div>
            {/* <div className={styles.user}>
                <div>
                    <UserCircleIcon
                        className={styles.userIcon}
                    ></UserCircleIcon>
                </div>
            </div> */}
            <div className={styles.navItems}>{props.children}</div>
            <div className={styles.navFooter}>
                <div>
                    {currentLeagueMemberType === LeagueMemberType.Manager &&
                        router.pathname.startsWith('/player') && (
                            <div
                                className={styles.navFooterButton}
                                onClick={() => router.push('/manager')}
                            >
                                Go To Manager View
                            </div>
                        )}
                    {currentLeagueMemberType === LeagueMemberType.Manager &&
                        router.pathname.startsWith('/manager') && (
                            <div
                                className={styles.navFooterButton}
                                onClick={() => router.push('/player')}
                            >
                                Go To Player View
                            </div>
                        )}
                    <div
                        className={styles.navFooterButton}
                        onClick={() => router.push('/select-league')}
                    >
                        Switch Leagues
                    </div>
                    <div
                        className={styles.navFooterButton}
                        onClick={() => logout()}
                    >
                        Logout
                    </div>
                </div>
                <div className={styles.copyright}>
                    <a href="https://dylan.clemann.com" target="_blank">
                        &copy; Clemann
                    </a>
                </div>
            </div>
        </div>
    );
}
