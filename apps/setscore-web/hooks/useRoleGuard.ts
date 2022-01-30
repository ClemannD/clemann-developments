import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserRole } from '../api-services/entities/user.entity';
import UserContext from '../context/user.context';

export default function useRoleGuard(roles: UserRole[]) {
    const [checked, setChecked] = useState(false);
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (user && !roles.includes(user.role)) {
            if (user.role === UserRole.Admin) {
                router.push('/admin');
            }
            if (user.role === UserRole.Manager) {
                router.push('/manager');
            }
            if (user.role === UserRole.Player) {
                router.push('/player');
            }
        } else {
            setChecked(true);
        }
    }, [user]);

    return checked;
}
