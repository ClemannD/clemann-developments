import { CogIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LogoWithBackground from '../../brand/logo/logo-with-background.component';
import styles from './navbar.module.scss';

export default function Navbar({ showLinks = true }: { showLinks?: boolean }) {
    const router = useRouter();

    return (
        <nav className={styles.navbar}>
            <div className="container">
                <div className={styles.navbarContent}>
                    <div className={styles.navbarLogo}>
                        <LogoWithBackground height={40} />
                    </div>

                    {showLinks && (
                        <>
                            <div className={styles.navbarLinks}>
                                <div
                                    className={`${styles.navbarLink} ${
                                        router.pathname === '/summary'
                                            ? styles.active
                                            : ''
                                    }`}
                                >
                                    <Link href={'/summary'}>Summary</Link>
                                </div>
                                <div
                                    className={`${styles.navbarLink} ${
                                        router.pathname === '/month'
                                            ? styles.active
                                            : ''
                                    }`}
                                >
                                    <Link href={'/monthly'}>Monthly</Link>
                                </div>
                                <div
                                    className={`${styles.navbarLink} ${
                                        router.pathname === '/configuration'
                                            ? styles.active
                                            : ''
                                    }`}
                                >
                                    <Link href={'/configuration'}>
                                        Configuration
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}

                    <div className={styles.navbarRight}>
                        <CogIcon className={styles.settingsIcon}></CogIcon>
                    </div>
                </div>
            </div>
        </nav>
    );
}
