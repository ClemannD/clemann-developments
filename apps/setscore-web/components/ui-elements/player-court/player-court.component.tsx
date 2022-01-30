import React from 'react';
import { CourtDto } from '../../../api-services/player/models';
import { PlayerBox } from './player-court-box.component';
import styles from './player-court.module.scss';

export default function PlayerCourt({
    court,
    compact = false
}: {
    court: CourtDto;
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
                    <PlayerBox
                        player={court.players[0]}
                        compact={compact}
                    ></PlayerBox>
                </div>
                <div className="col-6">
                    <PlayerBox
                        player={court.players[2]}
                        compact={compact}
                    ></PlayerBox>
                </div>
                <div className="col-6">
                    <PlayerBox
                        player={court.players[1]}
                        compact={compact}
                    ></PlayerBox>
                </div>
                <div className="col-6">
                    <PlayerBox
                        player={court.players[3]}
                        compact={compact}
                    ></PlayerBox>
                </div>
            </div>
            <div className={`${styles.alley} ${styles.bottom}`}>
                <div className={styles.net}></div>
            </div>
        </div>
    );
}
