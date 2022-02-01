import React from 'react';
import Button, {
    ButtonAppearance,
    ButtonSize
} from '../components/buttons/button.component';
import AuthLayout from '../components/layouts/auth-layout/auth-layout.component';
import useAuthGuard from '../hooks/useAuthGuard';

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
