import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import styles from './navbar.module.scss';

export default function Navbar(props) {
    const router = useRouter();
    const { user, logout } = useAuth0();

    return (
        <div className={styles.navbar}>
            {/* <Menu as="div" className={styles.userMenu}>
                {({ open }) => (
                    <>
                        <Menu.Button className={styles.userMenuButton}>
                            {user.name}{' '}
                            {open ? (
                                <ChevronUpIcon
                                    className={styles.userMenuChevron}
                                ></ChevronUpIcon>
                            ) : (
                                <ChevronDownIcon
                                    className={styles.userMenuChevron}
                                ></ChevronDownIcon>
                            )}
                        </Menu.Button>
                        <Transition
                            show={open}
                            enter={styles.menuEnter}
                            enterFrom={styles.menuEnterFrom}
                            enterTo={styles.menuEnterTo}
                            leave={styles.menuLeave}
                            leaveFrom={styles.menuLeaveFrom}
                            leaveTo={styles.menuLeaveTo}
                        >
                            <Menu.Items className={styles.userMenuItems} static>
                                <Menu.Item>
                                    <NavItem
                                        name="Settings"
                                        route="/settings"
                                        icon="adjustments"
                                    ></NavItem>
                                </Menu.Item>
                                <Menu.Item>
                                    <div style={{ marginTop: '1rem' }}>
                                        <Button
                                            clickHandler={logout}
                                            appearance={
                                                ButtonAppearance.Secondary
                                            }
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu> */}
        </div>
    );
}
