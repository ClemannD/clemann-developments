import { useAuth0 } from '@auth0/auth0-react';
import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/component/button';
import { DotsVerticalIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { LeagueMemberType } from '../../../api-services/entities/userToLeague.entity';
import useCurrentUser from '../../../hooks/useCurrentUser';
import Logo from '../../brand/logo/logo.component';
import TennisCourt from '../../brand/tennis-court/tennis-court.component';
import styles from './mobile-nav.module.scss';

export default function MobileNav(props) {
    const { currentLeagueMemberType } = useCurrentUser();
    const [navIsOpen, setNavIsOpen] = useState(false);
    const router = useRouter();
    const { user, logout } = useAuth0();

    return (
        <>
            {navIsOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => {
                        setNavIsOpen(false);
                    }}
                ></div>
            )}

            <div className={styles.mobileNav}>
                <div className={styles.navWrapper}>
                    <div className={styles.navHeader}>
                        <div onClick={() => router.push('/')}>
                            <TennisCourt height={32}></TennisCourt>
                        </div>
                        <div onClick={() => router.push('/')}>
                            <Logo height={17}></Logo>
                        </div>
                        {navIsOpen ? (
                            <XIcon
                                className={styles.menuIcon}
                                onClick={() => setNavIsOpen(false)}
                            ></XIcon>
                        ) : (
                            <DotsVerticalIcon
                                className={styles.menuIcon}
                                onClick={() => setNavIsOpen(true)}
                            ></DotsVerticalIcon>
                        )}
                    </div>

                    <div
                        className={`${styles.navMenu} ${
                            navIsOpen ? styles.navIsOpen : ''
                        }`}
                    >
                        <div>
                            {props.children}
                            <div className="row" style={{ marginTop: '2rem' }}>
                                <div className="col-6">
                                    <Button
                                        appearance={ButtonAppearance.Secondary}
                                        size={ButtonSize.Block}
                                        clickHandler={() =>
                                            router.push('/select-league')
                                        }
                                    >
                                        Switch Leagues
                                    </Button>
                                </div>
                                <div className="col-6">
                                    <Button
                                        appearance={ButtonAppearance.Secondary}
                                        size={ButtonSize.Block}
                                        clickHandler={() => logout()}
                                    >
                                        Logout
                                    </Button>
                                </div>
                                {currentLeagueMemberType ===
                                    LeagueMemberType.Manager &&
                                    router.pathname.startsWith('/player') && (
                                        <div
                                            className="col-12"
                                            style={{ marginTop: '1rem' }}
                                        >
                                            <Button
                                                appearance={
                                                    ButtonAppearance.Secondary
                                                }
                                                size={ButtonSize.Block}
                                                clickHandler={() =>
                                                    router.push('/manager')
                                                }
                                            >
                                                Go To Manager View
                                            </Button>
                                        </div>
                                    )}
                                {currentLeagueMemberType ===
                                    LeagueMemberType.Manager &&
                                    router.pathname.startsWith('/manager') && (
                                        <div
                                            className="col-12"
                                            style={{ marginTop: '1rem' }}
                                        >
                                            <Button
                                                appearance={
                                                    ButtonAppearance.Secondary
                                                }
                                                size={ButtonSize.Block}
                                                clickHandler={() =>
                                                    router.push('/player')
                                                }
                                            >
                                                Go To Player View
                                            </Button>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
