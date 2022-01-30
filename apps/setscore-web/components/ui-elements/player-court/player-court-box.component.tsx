import React from 'react';
import Pill, { PillColor } from '../pill/pill.component';
import useCurrentUser from '../../../hooks/useCurrentUser';
import styles from './player-court-box.module.scss';
import { PlayerDto } from '../../../api-services/manager/models';

export function PlayerBox({
    player,
    compact = false,
    skeleton = false
}: {
    player?: PlayerDto;
    compact?: boolean;
    skeleton?: boolean;
}) {
    const { currentUser } = useCurrentUser();

    const isCurrentUser = () => {
        return player?.userId === currentUser?.userId;
    };

    return (
        <div className={`${styles.playerBox} ${compact ? styles.compact : ''}`}>
            {player ? (
                <>
                    <Pill
                        color={
                            isCurrentUser() ? PillColor.Blue : PillColor.White
                        }
                        lightFont={isCurrentUser()}
                        style={{ marginBottom: '0.5rem' }}
                    >
                        {player.firstName} {player.lastName}
                    </Pill>
                    {player?.subUserId && (
                        <Pill
                            color={PillColor.Black}
                            lightFont
                            small
                            style={{ marginBottom: '0.5rem' }}
                        >
                            {player.subName}
                        </Pill>
                    )}
                    <div className={styles.scoreRow}>
                        <div className={styles.score}>
                            {player.set1Score || (
                                <span style={{ opacity: 0.8 }}>0</span>
                            )}
                        </div>
                        <div className={styles.score}>
                            {player.set2Score || (
                                <span style={{ opacity: 0.8 }}>0</span>
                            )}
                        </div>
                        <div className={styles.score}>
                            {player.set3Score || (
                                <span style={{ opacity: 0.8 }}>0</span>
                            )}
                        </div>
                        <div
                            className={styles.score}
                            style={{
                                fontWeight: 'bold'
                            }}
                        >
                            —
                        </div>
                        <div className={styles.score}>
                            {player.adjustedTotalScore || player.totalScore || (
                                <span style={{ opacity: 0.8 }}>0</span>
                            )}
                            {player.adjustedTotalScore && (
                                <span style={{ opacity: 0.8, fontWeight: 400 }}>
                                    *
                                </span>
                            )}
                        </div>
                    </div>
                </>
            ) : skeleton ? (
                <></>
            ) : (
                <Pill color={PillColor.White}> </Pill>
            )}
        </div>
    );
}
