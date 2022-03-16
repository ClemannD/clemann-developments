import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import React from 'react';
import { SetDto } from '../../../api-services/manager/models';
import styles from './team-score.module.scss';

export default function TeamScore({
    set,
    setNumber,
    style,
    showEmptySet = false,
    showLabel = true,
    clickable = false
}: {
    style?: React.CSSProperties;
    setNumber: number;
    set: SetDto;
    showEmptySet?: boolean;
    showLabel?: boolean;
    clickable?: boolean;
}) {
    return (
        <div style={{ ...style, width: '100%' }}>
            {showLabel && (
                <p
                    className={styles.setLabel}
                    style={{
                        marginBottom: '0.5rem'
                    }}
                >
                    Set {setNumber}
                </p>
            )}
            <div
                className="row"
                style={{
                    gap: '0'
                }}
            >
                {set || showEmptySet ? (
                    <>
                        <div className="col-5">
                            <Pill
                                color={PillColor.OffWhite}
                                blockSize
                                style={{
                                    marginBottom: '0.5rem'
                                }}
                            >
                                {set?.team1?.player1Name || 'No Player'}
                            </Pill>
                            <Pill color={PillColor.OffWhite} blockSize>
                                {set?.team1?.player2Name || 'No Player'}
                            </Pill>
                        </div>
                        <div className="col-2">
                            <div
                                className={`${styles.score} ${
                                    clickable ? styles.clickable : ''
                                }`}
                            >
                                <span
                                    className={
                                        set?.team1?.score === null
                                            ? styles.scorePlaceholder
                                            : ''
                                    }
                                >
                                    {set?.team1?.score || '0'}
                                </span>{' '}
                                <span
                                    className={
                                        set?.team1?.score === null ||
                                        set?.team2?.score === null
                                            ? styles.scorePlaceholder
                                            : ''
                                    }
                                >
                                    -{' '}
                                </span>
                                <span
                                    className={
                                        set?.team2?.score === null
                                            ? styles.scorePlaceholder
                                            : ''
                                    }
                                >
                                    {set?.team2?.score || '0'}
                                </span>
                            </div>
                        </div>
                        <div className="col-5">
                            <Pill
                                color={PillColor.OffWhite}
                                blockSize
                                style={{
                                    marginBottom: '0.5rem'
                                }}
                            >
                                {set?.team2?.player1Name || 'No Player'}
                            </Pill>
                            <Pill color={PillColor.OffWhite} blockSize>
                                {set?.team2?.player2Name || 'No Player'}
                            </Pill>
                        </div>
                    </>
                ) : (
                    <div className="col-12">
                        <div
                            className={`${styles.noScore} ${
                                clickable ? styles.clickable : ''
                            }`}
                        >
                            <p>Scores not yet submitted</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
