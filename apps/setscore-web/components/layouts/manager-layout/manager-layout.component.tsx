import useAuthGuard from '../../../hooks/useAuthGuard';
import LoadingScreen from '../../navigation/loading-screen/loading-screen';
import NavItem from '../../navigation/nav-item/nav-item.component';
import SideNav from '../../navigation/side-nav/side-nav.component';
import styles from './manager-layout.module.scss';
import useRoleGuard from '../../../hooks/useRoleGuard';
import { UserRole } from '../../../api-services/entities/user.entity';
import useCurrentLeagueGuard from '../../../hooks/useCurrentLeagueGuard';
import useWindowSize from '../../../hooks/useWindowDimensions';
import MobileNav from '../../navigation/mobile-nav/mobile-nav.component';
import useRegisteredGuard from '../../../hooks/useRegisteredGuard';

export default function ManagerLayout(props) {
    const { isAuthenticated } = useAuthGuard();
    useCurrentLeagueGuard();
    const checked = useRoleGuard([UserRole.Manager, UserRole.Admin]);
    const { mediumBelow } = useWindowSize();
    useRegisteredGuard();

    if (isAuthenticated && checked) {
        return (
            <div className={styles.managerLayout}>
                {mediumBelow ? (
                    <MobileNav>
                        <NavItem
                            name="Home"
                            route="/manager"
                            icon="home"
                            isBase
                        ></NavItem>
                        <NavItem
                            name="Week"
                            route="/manager/week"
                            icon="clipboardList"
                        ></NavItem>
                        <NavItem
                            name="Players"
                            route="/manager/players"
                            icon="users"
                        ></NavItem>
                    </MobileNav>
                ) : (
                    <SideNav>
                        <NavItem
                            name="Home"
                            route="/manager"
                            icon="home"
                            isBase
                        ></NavItem>
                        <NavItem
                            name="Week"
                            route="/manager/week"
                            icon="clipboardList"
                        ></NavItem>
                        <NavItem
                            name="Players"
                            route="/manager/players"
                            icon="users"
                        ></NavItem>
                    </SideNav>
                )}
                <div
                    className={styles.viewport}
                    style={{ marginTop: mediumBelow ? '6rem' : '0' }}
                >
                    {props.children}
                </div>
            </div>
        );
    }
    return <LoadingScreen></LoadingScreen>;
}
