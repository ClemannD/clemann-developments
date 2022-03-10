import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { useAuthGuard } from '@clemann-developments/react/hooks/next/use-auth-guard';
import LogoWithBackground from '../../components/brand/logo/logo-with-background.component';

import LoadingScreen from '../../components/navigation/loading-screen/loading-screen';
import styles from './login.module.scss';

export default function LoginPage() {
    const { loginWithRedirect, authIsLoading } = useAuthGuard(false);

    if (authIsLoading) {
        return <LoadingScreen></LoadingScreen>;
    } else {
        return (
            <div className={styles.loginPage}>
                <div className={styles.loginContent}>
                    <div
                        style={{
                            marginBottom: '3rem'
                        }}
                    >
                        <LogoWithBackground height={60} />
                    </div>

                    <Button
                        id="login-button"
                        size={ButtonSize.Auto}
                        appearance={ButtonAppearance.Secondary}
                        clickHandler={loginWithRedirect}
                    >
                        Login or Create Account
                    </Button>
                </div>
            </div>
        );
    }
}
