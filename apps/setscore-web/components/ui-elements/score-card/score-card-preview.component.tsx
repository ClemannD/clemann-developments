import DateFormat from '../date/date.component';
import TeamScore from '../team-score/team-score.component';
import styles from './score-card-preview.module.scss';

export default function ScoreCardPreview({
    setNumber,
    courtNumber,
    team1Player1Name,
    team1Player2Name,
    team2Player1Name,
    team2Player2Name,
    team1Score,
    team2Score,
    style
}: {
    setNumber?: number;
    courtNumber?: number;
    team1Player1Name?: string;
    team1Player2Name?: string;
    team2Player1Name?: string;
    team2Player2Name?: string;
    team1Score?: number;
    team2Score?: number;
    style?: React.CSSProperties;
}) {
    return (
        <div className={styles.scoreCardPreview} style={style}>
            <div className={styles.header}>
                <div className={styles.setNumber}>Set {setNumber}</div>

                <div className={styles.setDetails}>
                    <p className="body">Court {courtNumber}</p>
                    <div className={styles.date}>
                        <DateFormat date={new Date()}></DateFormat>
                    </div>
                </div>
            </div>

            <TeamScore
                style={{
                    marginTop: '1rem'
                }}
                setNumber={setNumber}
                showLabel={false}
                set={{
                    setNumber,
                    team1: {
                        player1Name: team1Player1Name,
                        player2Name: team1Player2Name,
                        score: team1Score
                    },
                    team2: {
                        player1Name: team2Player1Name,
                        player2Name: team2Player2Name,
                        score: team2Score
                    }
                }}
            ></TeamScore>
        </div>
    );
}
