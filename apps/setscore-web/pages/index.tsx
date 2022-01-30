import React from 'react';
import { UserRole } from '../api-services/entities/user.entity';
import LoadingScreen from '../components/navigation/loading-screen/loading-screen';
import useAuthGuard from '../hooks/useAuthGuard';
import useCurrentLeagueGuard from '../hooks/useCurrentLeagueGuard';
import useRegisteredGuard from '../hooks/useRegisteredGuard';
import useRoleGuard from '../hooks/useRoleGuard';

export default function HomePage() {
    const authGuard = useAuthGuard();
    const roleGuard = useRoleGuard([UserRole.Unassigned]);
    const currentLeagueGuard = useCurrentLeagueGuard();
    useRegisteredGuard();

    return <LoadingScreen></LoadingScreen>;
}
