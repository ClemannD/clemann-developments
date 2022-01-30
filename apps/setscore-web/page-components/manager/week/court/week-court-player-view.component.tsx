import React, { useContext, useState } from 'react';
import styles from './week-court-player-view.module.scss';
import { ManagerWeekCourtContext } from './week-court.component';
import { PlayerBox } from '../../../../components/ui-elements/player-court/player-court-box.component';
import WeekScoreEditCard from './week-score-edit-card.component';
import { PlayerDto } from '../../../../api-services/manager/models';

export default function WeekCourtPlayerView() {
    const { court, setShowSetView } = useContext(ManagerWeekCourtContext);
    const [hasMissingPlayer, setHasMissingPlayer] = useState(
        court.players.length
    );
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerDto | null>(
        null
    );

    return selectedPlayer ? (
        <WeekScoreEditCard
            player={selectedPlayer}
            onCancel={() => setSelectedPlayer(null)}
        ></WeekScoreEditCard>
    ) : (
        <>
            <div className={styles.court}>
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
                    <div
                        className="col-6"
                        onClick={() => {
                            setSelectedPlayer(court.players[0]);
                        }}
                    >
                        <PlayerBox player={court.players[0]}></PlayerBox>
                    </div>
                    <div
                        className="col-6"
                        onClick={() => {
                            setSelectedPlayer(court.players[2]);
                        }}
                    >
                        <PlayerBox player={court.players[2]}></PlayerBox>
                    </div>
                    <div
                        className="col-6"
                        onClick={() => {
                            setSelectedPlayer(court.players[1]);
                        }}
                    >
                        <PlayerBox player={court.players[1]}></PlayerBox>
                    </div>
                    <div
                        className="col-6"
                        onClick={() => {
                            setSelectedPlayer(court.players[3]);
                        }}
                    >
                        <PlayerBox player={court.players[3]}></PlayerBox>
                    </div>
                </div>
                <div className={`${styles.alley} ${styles.bottom}`}>
                    <div className={styles.net}></div>
                </div>
            </div>
            <div
                className={`${styles.switchViewBar} ${
                    court.players.length < 4 ? styles.disabled : ''
                } `}
                onClick={() => {
                    if (!(court.players.length < 4)) {
                        setShowSetView(true);
                    }
                }}
            >
                <p>View Sets</p>
            </div>
        </>
    );
}
