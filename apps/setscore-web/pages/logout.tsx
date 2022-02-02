import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export default function LogoutPage() {
    const auth0 = useAuth0();

    useEffect(() => {
        auth0.logout({
            returnTo: process.env.NEXT_PUBLIC_BASE_WEB_URL
        });
    }, []);

    return <div></div>;
}
