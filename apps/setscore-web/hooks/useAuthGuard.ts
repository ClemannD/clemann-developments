import { useRouter } from 'next/router';
import { RedirectLoginOptions, useAuth0, User } from '@auth0/auth0-react';
import { useEffect } from 'react';

export default function useAuthGuard(authRequired = true): {
    user: User;
    isAuthenticated: boolean;
    authIsLoading: boolean;
    authError: Error;
    loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
} {
    const auth0 = useAuth0();
    const router = useRouter();

    useEffect(() => {
        if (!auth0.isLoading && !auth0.isAuthenticated && authRequired) {
            router.push('/login');
        } else if (!auth0.isLoading && auth0.isAuthenticated && !authRequired) {
            router.push('/');
        }
    }, [auth0.isLoading, auth0.isAuthenticated]);

    return {
        user: auth0.user,
        isAuthenticated: auth0.isAuthenticated,
        authIsLoading: auth0.isLoading,
        authError: auth0.error,
        loginWithRedirect: auth0.loginWithRedirect
    };
}
