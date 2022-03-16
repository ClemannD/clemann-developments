import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user.context';

export default function useRegisteredGuard(preventRegistered: boolean = false) {
    const [checked, setChecked] = useState(false);
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (!!user) {
            if (
                !preventRegistered &&
                (!user.firstName || !user.lastName || !user.accountId)
            ) {
                router.push('/register');
                return;
            } else if (preventRegistered && !!user.accountId) {
                router.push('/');
                return;
            }
            setChecked(true);
        }
    }, [user]);

    return checked;
}
