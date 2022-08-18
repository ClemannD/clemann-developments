import { useAuthGuard } from '@clemann-developments/react/hooks/next/use-auth-guard';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingScreen from '../../components/navigation/loading-screen/loading-screen';
import useRegisteredGuard from '../../hooks/useRegisteredGuard';

export default function HomePage() {
    useAuthGuard();
    const router = useRouter();

    const registrationChecked = useRegisteredGuard();

    useEffect(() => {
        if (registrationChecked) {
            router.push('/overview');
        }
    }, [registrationChecked]);

    return <LoadingScreen></LoadingScreen>;
}
