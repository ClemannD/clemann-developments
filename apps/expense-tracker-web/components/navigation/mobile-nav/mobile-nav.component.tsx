import { useAuth0 } from '@auth0/auth0-react';
import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { DotsVerticalIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import LogoWithBackground from '../../brand/logo/logo-with-background.component';
import Logo from '../../brand/logo/logo.component';
import styles from './mobile-nav.module.scss';

export default function MobileNav({
    showLinks = true
}: {
    showLinks?: boolean;
}) {
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
                            <LogoWithBackground
                                height={32}
                            ></LogoWithBackground>
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
                            {showLinks && (
                                <>
                                    <div
                                        className={`${styles.navbarLink} ${
                                            router.pathname === '/summary'
                                        }`}
                                    >
                                        <Link href={'/summary'}>Summary</Link>
                                    </div>
                                    <div
                                        className={`${styles.navbarLink} ${
                                            router.pathname === '/monthly'
                                        }`}
                                    >
                                        <Link href={'/monthly'}>Monthly</Link>
                                    </div>
                                    <div
                                        className={`${styles.navbarLink} ${
                                            router.pathname === '/configuration'
                                        }`}
                                    >
                                        <Link href={'/configuration'}>
                                            Configuration
                                        </Link>
                                    </div>
                                </>
                            )}
                            <div className="row" style={{ marginTop: '2rem' }}>
                                <div className="col-12">
                                    <Button
                                        appearance={ButtonAppearance.Secondary}
                                        size={ButtonSize.Block}
                                        clickHandler={() => logout()}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
