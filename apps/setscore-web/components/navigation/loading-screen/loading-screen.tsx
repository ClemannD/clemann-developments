import styles from './loading-screen.module.scss';
import ScaleLoader from 'react-spinners/ScaleLoader';
import TennisCourtWithLogo from '../../brand/logo-with-tennis-court/logo-with-tennis-court';

export default function LoadingScreen() {
    return (
        <div className={styles.loadingScreen}>
            <div style={{ marginBottom: '3rem' }}>
                <TennisCourtWithLogo height={50}></TennisCourtWithLogo>
            </div>
            <ScaleLoader color="#57a773"></ScaleLoader>
        </div>
    );
}
