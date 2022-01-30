import {
    AdjustmentsIcon,
    ClipboardListIcon,
    HomeIcon,
    TableIcon,
    UserGroupIcon,
    UsersIcon
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './nav-item.module.scss';

const NavItem = ({
    name,
    route,
    icon,
    isBase = false
}: {
    name?: string;
    route?: string;
    icon?: string;
    isBase?: boolean;
}) => {
    const router = useRouter();

    const iconClasses = {
        home: HomeIcon,
        userGroup: UserGroupIcon,
        users: UsersIcon,
        adjustments: AdjustmentsIcon,
        clipboardList: ClipboardListIcon,
        table: TableIcon
    };

    const IconTag = iconClasses[icon];

    const isActive =
        router.pathname === route ||
        (!isBase && router.pathname.includes(`${route}/`));

    return (
        <Link href={route}>
            <div
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
                <IconTag className={styles.icon}></IconTag>
                {name}
            </div>
        </Link>
    );
};

export default NavItem;
