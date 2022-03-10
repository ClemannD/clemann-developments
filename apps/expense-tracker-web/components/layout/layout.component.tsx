import { useWindowSize } from '@clemann-developments/react/hooks/use-window-dimensions';
import MobileNav from '../navigation/mobile-nav/mobile-nav.component';
import Navbar from '../navigation/navbar/navbar.component';
import styles from './layout.module.scss';

export default function Layout({
    showLinks = true,
    children
}: {
    showLinks?: boolean;
    children: React.ReactNode;
}) {
    const { mediumBelow } = useWindowSize();

    return (
        <div className={styles.layout}>
            {mediumBelow ? (
                <MobileNav showLinks={showLinks} />
            ) : (
                <Navbar showLinks={showLinks} />
            )}
            {children}
        </div>
    );
}
