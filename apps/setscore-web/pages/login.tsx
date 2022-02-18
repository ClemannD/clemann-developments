import {
    Button,
    ButtonSize,
    ButtonAppearance
} from '@clemann-developments/react/component/button';
import { useAuthGuard } from '@clemann-developments/react/hooks/next/use-auth-guard';
import React from 'react';
import AuthLayout from '../components/layouts/auth-layout/auth-layout.component';

export default function Login() {
    const { loginWithRedirect, authIsLoading } = useAuthGuard(false);

    return (
        <AuthLayout isLoading={authIsLoading}>
            <div>
                <h2
                    style={{
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}
                >
                    Welcome
                </h2>
                <p
                    className="larger"
                    style={{
                        marginBottom: '2rem',
                        fontWeight: 400
                    }}
                >
                    Click the button to be taken to the sign in portall
                </p>
                <Button
                    id="login-button"
                    size={ButtonSize.Block}
                    appearance={ButtonAppearance.Primary}
                    clickHandler={loginWithRedirect}
                >
                    Login or Create Account
                </Button>
            </div>
        </AuthLayout>
    );
}
