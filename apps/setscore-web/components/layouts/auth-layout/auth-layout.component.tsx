import React from 'react';
import useWindowSize from '../../../hooks/useWindowDimensions';
import TennisCourtWithLogo from '../../brand/logo-with-tennis-court/logo-with-tennis-court';
import TennisCourtCorner from '../../brand/tennis-court-corner/tennis-court-corner.component';
import LoadingScreen from '../../navigation/loading-screen/loading-screen';
import styles from './auth-layout.module.scss';

export default function AuthLayout({ isLoading, children }) {
    const { mediumBelow, largeBelow } = useWindowSize();

    if (!isLoading) {
        return (
            <div className={styles.authLayout}>
                <div className="row no-gutter">
                    <div className="col-12 col-md-6">
                        <div className={styles.authSide}>
                            <TennisCourtWithLogo
                                height={largeBelow ? 60 : 80}
                                className={styles.logo}
                            ></TennisCourtWithLogo>
                            {children}
                        </div>
                    </div>
                    <div
                        className="col-12 col-md-6"
                        style={{ position: 'relative' }}
                    >
                        <div className={styles.backgroundImageWrapper}>
                            <div className={styles.overlay}></div>
                            <div className={styles.backgroundImage}></div>
                        </div>
                    </div>
                    <TennisCourtCorner
                        className={styles.tennisCourtCorner}
                        height={mediumBelow ? 200 : 300}
                    ></TennisCourtCorner>
                </div>
            </div>
        );
    }

    return <LoadingScreen></LoadingScreen>;
}
