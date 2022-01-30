import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user.context';

export default function useRegisteredGuard() {
    const [checked, setChecked] = useState(false);
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (
            user &&
            (!user.firstName || !user.lastName || !user.email || !user.phone) &&
            user.userToLeague?.length > 0
        ) {
            router.push('/register');
        }
        setChecked(true);
    }, [user]);

    return checked;
}
