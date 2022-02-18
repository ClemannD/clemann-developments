import LoadingScreen from '../../navigation/loading-screen/loading-screen';
import NavItem from '../../navigation/nav-item/nav-item.component';
import SideNav from '../../navigation/side-nav/side-nav.component';
import styles from './admin-layout.module.scss';
import useRoleGuard from '../../../hooks/useRoleGuard';
import { UserRole } from '../../../api-services/entities/user.entity';
import MobileNav from '../../navigation/mobile-nav/mobile-nav.component';
import useRegisteredGuard from '../../../hooks/useRegisteredGuard';
import { useAuthGuard } from '@clemann-developments/react/hooks/next/use-auth-guard';
import { useWindowSize } from '@clemann-developments/react/hooks/use-window-dimensions';

export default function AdminLayout(props) {
    const { isAuthenticated } = useAuthGuard();
    const checked = useRoleGuard([UserRole.Admin]);
    const { mediumBelow } = useWindowSize();
    useRegisteredGuard();

    if (isAuthenticated && checked) {
        return (
            <div className={styles.adminLayout}>
                {mediumBelow ? (
                    <MobileNav>
                        <NavItem
                            name="Home"
                            route="/admin"
                            icon="home"
                            isBase
                        ></NavItem>
                        <NavItem
                            name="Leagues"
                            route="/admin/leagues"
                            icon="userGroup"
                        ></NavItem>
                        <NavItem
                            name="Users"
                            route="/admin/users"
                            icon="users"
                        ></NavItem>
                        <NavItem
                            name="Strategies"
                            route="/admin/strategies"
                            icon="adjustments"
                        ></NavItem>
                    </MobileNav>
                ) : (
                    <SideNav>
                        <NavItem
                            name="Home"
                            route="/admin"
                            icon="home"
                            isBase
                        ></NavItem>
                        <NavItem
                            name="Leagues"
                            route="/admin/leagues"
                            icon="userGroup"
                        ></NavItem>
                        <NavItem
                            name="Users"
                            route="/admin/users"
                            icon="users"
                        ></NavItem>
                        <NavItem
                            name="Strategies"
                            route="/admin/strategies"
                            icon="adjustments"
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
