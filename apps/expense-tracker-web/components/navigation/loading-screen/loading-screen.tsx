import styles from './loading-screen.module.scss';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Logo from '../../brand/logo/logo.component';
import LogoWithBackground from '../../brand/logo/logo-with-background.component';

export default function LoadingScreen() {
    return (
        <div className={styles.loadingScreen}>
            <div style={{ marginBottom: '3rem' }}>
                <LogoWithBackground height={80} />
            </div>
            <ScaleLoader color="#052665"></ScaleLoader>
        </div>
    );
}
