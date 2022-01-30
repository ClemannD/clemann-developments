import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserRole } from '../api-services/entities/user.entity';
import CurrentLeagueContext from '../context/currentLeague.context';
import UserContext from '../context/user.context';

export default function useCurrentLeagueGuard() {
    const currentLeague = useContext(CurrentLeagueContext);
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (user && !currentLeague && !(user.role === UserRole.Admin)) {
            router.push('/select-league');
        }
    }, [currentLeague, user]);
}
