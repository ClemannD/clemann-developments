import { useScrollPosition } from '@clemann-developments/react/hooks/use-scroll-position';
import { CogIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LogoWithBackground from '../../brand/logo/logo-with-background.component';
import styles from './navbar.module.scss';

export default function Navbar({ showLinks = true }: { showLinks?: boolean }) {
    const router = useRouter();
    const scrollPosition = useScrollPosition();

    const [settingsOpen, setSettingsOpen] = useState(false);

    const toggleSettingsOpen = () => {
        setSettingsOpen(!settingsOpen);
    };

    return (
        <nav
            className={`
                ${styles.navbar}
                ${scrollPosition >= 20 ? styles.navbarCollapsed : ''}
            `}
            style={{
                top: scrollPosition >= 20 ? 0 : -scrollPosition
            }}
        >
            <div className="container">
                <div className={styles.navbarContent}>
                    <Link href={'/overview'}>
                        <div className={styles.navbarLogo}>
                            <LogoWithBackground height={40} />
                        </div>
                    </Link>

                    {showLinks && (
                        <>
                            <div className={styles.navbarLinks}>
                                <div
                                    className={`${styles.navbarLink} ${
                                        router.pathname === '/overview'
                                            ? styles.active
                                            : ''
                                    }`}
                                >
                                    <Link href={'/overview'}>Overview</Link>
                                </div>
                                <div
                                    className={`${styles.navbarLink} ${
                                        router.pathname.startsWith('/month')
                                            ? styles.active
                                            : ''
                                    }`}
                                >
                                    <Link href={'/month'}>Monthly</Link>
                                </div>
                                <div
                                    className={`${styles.navbarLink} ${
                                        router.pathname === '/intake'
                                            ? styles.active
                                            : ''
                                    }`}
                                >
                                    <Link href={'/intake'}>Intake</Link>
                                </div>
                            </div>
                        </>
                    )}

                    <div className={styles.navbarRight}>
                        <CogIcon
                            className={styles.settingsIcon}
                            onClick={toggleSettingsOpen}
                        ></CogIcon>

                        {settingsOpen && (
                            <div className={styles.navbarSettings}>
                                <div className={styles.navbarSettingsItem}>
                                    <Link href={'/configuration'}>
                                        Configuration
                                    </Link>
                                </div>
                                <div className={styles.navbarSettingsItem}>
                                    <Link href={'/logout'}>Logout</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
