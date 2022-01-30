import React from 'react';
import styles from './player-court-skeleton.module.scss';

export default function PlayerCourtSkeleton({
    compact = false
}: {
    compact?: boolean;
}) {
    return (
        <div className={`${styles.court} ${compact ? styles.compact : ''}`}>
            <div className={`${styles.alley} ${styles.top}`}>
                <div className={styles.net}></div>
            </div>
            <div className={styles.net}></div>
            <div className={styles.centerLine}></div>

            <div
                className="row"
                style={{
                    gap: '0'
                }}
            >
                <div className="col-6">
                    <div
                        className={`${styles.playerBox} ${
                            compact ? styles.compact : ''
                        }`}
                    >
                        <div className={styles.placeholder}></div>
                        <div
                            className={`${styles.placeholder} ${styles.shorter}`}
                        ></div>
                    </div>
                </div>
                <div className="col-6">
                    <div
                        className={`${styles.playerBox} ${
                            compact ? styles.compact : ''
                        }`}
                    >
                        <div className={styles.placeholder}></div>
                        <div
                            className={`${styles.placeholder} ${styles.shorter}`}
                        ></div>
                    </div>
                </div>
                <div className="col-6">
                    <div
                        className={`${styles.playerBox} ${
                            compact ? styles.compact : ''
                        }`}
                    >
                        <div className={styles.placeholder}></div>
                        <div
                            className={`${styles.placeholder} ${styles.shorter}`}
                        ></div>
                    </div>
                </div>
                <div className="col-6">
                    <div
                        className={`${styles.playerBox} ${
                            compact ? styles.compact : ''
                        }`}
                    >
                        <div className={styles.placeholder}></div>
                        <div
                            className={`${styles.placeholder} ${styles.shorter}`}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={`${styles.alley} ${styles.bottom}`}>
                <div className={styles.net}></div>
            </div>
        </div>
    );
}
