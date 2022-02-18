import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/component/button';
import { useEventBus } from '@clemann-developments/react/hooks/use-event-bus';
import { useEffect, useState } from 'react';
import useGetCurrentCourt, {
    PlayerDto
} from '../../../api-services/player/score/getCurrentCourt.service';
import useSetScore from '../../../api-services/player/score/setScore.service';
import { EventBusActionTypes } from '../../../constants/event-bus-action-types';
import useCurrentUser from '../../../hooks/useCurrentUser';
import Logo from '../../brand/logo/logo.component';
import ScoreCardPreview from './score-card-preview.component';
import styles from './score-card.module.scss';

export enum ScoreCardState {
    Disabled,
    Closed,
    Set,
    Team,
    YourScore,
    OpponentScore,
    Confirm,
    Saved,
    Repeated
}

export default function ScoreCard() {
    const { currentUser } = useCurrentUser();
    const getCurrentCourt = useGetCurrentCourt();
    const setScore = useSetScore();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [courtPlayers, setCourtPlayers] = useState<PlayerDto[]>([]);

    const [scoreCardState, setScoreCardState] = useState(ScoreCardState.Closed);
    const [setNumber, setSetNumber] = useState(null);
    const [teamMemberPlayer, setTeamMemberPlayer] = useState<PlayerDto>(null);
    const [opponentPlayers, setOpponentPlayers] = useState<PlayerDto[]>(null);
    const [yourScore, setYourScore] = useState(null);
    const [opponentScore, setOpponentScore] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const eventBus = useEventBus<EventBusActionTypes>();

    useEffect(() => {
        if (currentUser) {
            getCurrentCourt.mutate({});
        }
    }, [currentUser]);

    useEffect(() => {
        if (getCurrentCourt.data) {
            if (getCurrentCourt.data.currentCourt) {
                setIsDisabled(false);
                setCourtPlayers(getCurrentCourt.data.currentCourt.players);
            }
        }
    }, [getCurrentCourt.data]);

    useEffect(() => {
        if (setScore.data) {
            if (setScore.data.repeatedSetEntry) {
                setScoreCardState(ScoreCardState.Repeated);
            } else {
                setScoreCardState(ScoreCardState.Saved);
            }
        }
    }, [setScore.data]);

    useEffect(() => {
        if (teamMemberPlayer) {
            setOpponentPlayers(
                courtPlayers.filter(
                    (player: PlayerDto) =>
                        player.playerId !== teamMemberPlayer.playerId
                )
            );
        } else {
            setOpponentPlayers(null);
        }
    }, [teamMemberPlayer]);

    const submitScore = async () => {
        setIsSubmitting(true);
        await setScore.mutateAsync({
            setScore: {
                courtId: getCurrentCourt.data.currentCourt.courtId,

                setNumber,
                team1Player1Id:
                    getCurrentCourt.data.currentCourt.currentUserPlayer
                        .playerId,
                team1Player2Id: teamMemberPlayer.playerId,
                team2Player1Id: opponentPlayers[0].playerId,
                team2Player2Id: opponentPlayers[1].playerId,
                team1Score: yourScore,
                team2Score: opponentScore
            }
        });
        eventBus.dispatchEvent(EventBusActionTypes.SCORE_SUBMITTED);
        setIsSubmitting(false);
    };

    const openScoreCard = () => {
        if (scoreCardState === ScoreCardState.Closed) {
            if (isDisabled) {
                setScoreCardState(ScoreCardState.Disabled);
            } else {
                setScoreCardState(ScoreCardState.Set);
            }
        }
    };

    const goBack = () => {
        setScoreCardState((prevState) => {
            switch (prevState) {
                case ScoreCardState.Set:
                    return ScoreCardState.Closed;
                case ScoreCardState.Team:
                    setSetNumber(null);
                    return ScoreCardState.Set;
                case ScoreCardState.YourScore:
                    setTeamMemberPlayer(null);
                    return ScoreCardState.Team;
                case ScoreCardState.OpponentScore:
                    setYourScore(null);
                    return ScoreCardState.YourScore;
                case ScoreCardState.Confirm:
                    setOpponentScore(null);
                    return ScoreCardState.OpponentScore;
                case ScoreCardState.Saved:
                case ScoreCardState.Repeated:
                    setSetNumber(null);
                    setTeamMemberPlayer(null);
                    setYourScore(null);
                    setOpponentScore(null);
                    return ScoreCardState.Closed;
                default:
                    return ScoreCardState.Closed;
            }
        });
    };

    return (
        <>
            {scoreCardState !== ScoreCardState.Closed && (
                <div className={styles.overlay}></div>
            )}
            <div
                className={`
                ${styles.scoreCard}
                ${isDisabled ? styles.scoreCardDisabled : ''}
                ${scoreCardState !== ScoreCardState.Closed ? styles.active : ''}
                ${
                    scoreCardState === ScoreCardState.Disabled
                        ? styles.showingDisabled
                        : ''
                }
                ${
                    scoreCardState === ScoreCardState.Closed
                        ? styles.showingClosed
                        : ''
                }
                ${
                    scoreCardState === ScoreCardState.Set
                        ? styles.showingSet
                        : ''
                }
                ${
                    scoreCardState === ScoreCardState.Team
                        ? styles.showingTeam
                        : ''
                }
                ${
                    scoreCardState === ScoreCardState.YourScore
                        ? styles.showingYourScore
                        : ''
                }
                ${
                    scoreCardState === ScoreCardState.OpponentScore
                        ? styles.showingOpponentScore
                        : ''
                }
                ${
                    scoreCardState === ScoreCardState.Confirm
                        ? styles.showingConfirm
                        : ''
                }
                ${
                    scoreCardState === ScoreCardState.Saved
                        ? styles.showingSaved
                        : ''
                }
                ${
                    scoreCardState === ScoreCardState.Repeated
                        ? styles.showingRepeated
                        : ''
                }
            `}
                onClick={openScoreCard}
            >
                <div
                    style={{
                        marginBottom:
                            scoreCardState === ScoreCardState.Closed
                                ? '0.5rem'
                                : '1.5rem'
                    }}
                >
                    <Logo height={20} white></Logo>
                </div>

                {scoreCardState !== ScoreCardState.Closed &&
                    scoreCardState !== ScoreCardState.Disabled &&
                    scoreCardState !== ScoreCardState.Set && (
                        <ScoreCardPreview
                            style={{
                                marginBottom: '2rem'
                            }}
                            setNumber={setNumber}
                            courtNumber={1}
                            team1Player1Name={
                                getCurrentCourt.data?.currentCourt
                                    ?.currentUserPlayer?.playerName
                            }
                            team1Player2Name={teamMemberPlayer?.playerName}
                            team2Player1Name={opponentPlayers?.[0]?.playerName}
                            team2Player2Name={opponentPlayers?.[1]?.playerName}
                            team1Score={yourScore}
                            team2Score={opponentScore}
                        ></ScoreCardPreview>
                    )}

                {scoreCardState === ScoreCardState.Closed && (
                    <div className={styles.tag}>Tap to enter a score</div>
                )}

                {scoreCardState === ScoreCardState.Disabled && (
                    <h3 style={{ marginBottom: '2rem' }}>
                        You can only submit scores if you are assigned to a
                        court. If you believe you are meant to be assigned to a
                        court, please contact the league manager.
                    </h3>
                )}

                {scoreCardState === ScoreCardState.Set && (
                    <div
                        className={`${styles.scoreCardSection} ${styles.scoreCardSet}`}
                    >
                        <h3 style={{ marginBottom: '2rem' }}>
                            Which Set is it?
                        </h3>

                        <div className="row" style={{ marginBottom: '3rem' }}>
                            <div className="col-4">
                                <Button
                                    appearance={ButtonAppearance.JumboNumber}
                                    size={ButtonSize.Block}
                                    clickHandler={() => {
                                        setSetNumber(1);
                                        setScoreCardState(ScoreCardState.Team);
                                    }}
                                >
                                    1
                                </Button>
                            </div>
                            <div className="col-4">
                                <Button
                                    appearance={ButtonAppearance.JumboNumber}
                                    size={ButtonSize.Block}
                                    clickHandler={() => {
                                        setSetNumber(2);
                                        setScoreCardState(ScoreCardState.Team);
                                    }}
                                >
                                    2
                                </Button>
                            </div>
                            <div className="col-4">
                                <Button
                                    appearance={ButtonAppearance.JumboNumber}
                                    size={ButtonSize.Block}
                                    clickHandler={() => {
                                        setSetNumber(3);
                                        setScoreCardState(ScoreCardState.Team);
                                    }}
                                >
                                    3
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {scoreCardState === ScoreCardState.Team && (
                    <div
                        className={`${styles.scoreCardSection} ${styles.scoreCardTeam}`}
                        style={{ marginBottom: '2rem' }}
                    >
                        <h3 style={{ marginBottom: '2rem' }}>
                            Who is your teammate?
                        </h3>
                        {courtPlayers.map((player) => (
                            <Button
                                key={player.playerId}
                                style={{ marginBottom: '1rem' }}
                                appearance={ButtonAppearance.Jumbo}
                                size={ButtonSize.Block}
                                clickHandler={() => {
                                    setTeamMemberPlayer(player);
                                    setScoreCardState(ScoreCardState.YourScore);
                                }}
                            >
                                {player.playerName}
                            </Button>
                        ))}
                    </div>
                )}

                {scoreCardState === ScoreCardState.YourScore && (
                    <div
                        className={`${styles.scoreCardSection} ${styles.scoreCardTeam}`}
                        style={{ marginBottom: '2rem' }}
                    >
                        <h3 style={{ marginBottom: '2rem' }}>Your Score?</h3>

                        <div className="row">
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((number) => (
                                <div
                                    key={number}
                                    className="col-3"
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <Button
                                        appearance={
                                            ButtonAppearance.JumboNumber
                                        }
                                        size={ButtonSize.Block}
                                        clickHandler={() => {
                                            setYourScore(number);
                                            setScoreCardState(
                                                ScoreCardState.OpponentScore
                                            );
                                        }}
                                    >
                                        {number}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {scoreCardState === ScoreCardState.OpponentScore && (
                    <div
                        className={`${styles.scoreCardSection} ${styles.scoreCardTeam}`}
                        style={{ marginBottom: '2rem' }}
                    >
                        <h3 style={{ marginBottom: '2rem' }}>
                            Opponent's Score?
                        </h3>

                        <div className="row">
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((number) => (
                                <div
                                    key={number}
                                    className="col-3"
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <Button
                                        appearance={
                                            ButtonAppearance.JumboNumber
                                        }
                                        size={ButtonSize.Block}
                                        clickHandler={() => {
                                            setOpponentScore(number);
                                            setScoreCardState(
                                                ScoreCardState.Confirm
                                            );
                                        }}
                                    >
                                        {number}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {scoreCardState === ScoreCardState.Confirm && (
                    <Button
                        style={{
                            marginBottom: '2rem'
                        }}
                        appearance={ButtonAppearance.Jumbo}
                        size={ButtonSize.Block}
                        isSubmitting={isSubmitting}
                        isSubmittingText="Saving..."
                        clickHandler={submitScore}
                    >
                        Submit Score
                    </Button>
                )}

                {scoreCardState === ScoreCardState.Saved && (
                    <div
                        className={`${styles.scoreCardSection} ${styles.scoreCardTeam}`}
                        style={{ marginBottom: '2rem' }}
                    >
                        <h3>Score has been saved</h3>
                    </div>
                )}

                {scoreCardState === ScoreCardState.Repeated && (
                    <div
                        className={`${styles.scoreCardSection} ${styles.scoreCardTeam}`}
                        style={{ marginBottom: '2rem' }}
                    >
                        <h3 style={{ marginBottom: '2rem' }}>
                            A score for set {setNumber} has already been
                            submitted. Please check the scores for your court,
                            and if you believe there has been a scoring mistake,
                            please contact the your league manager.
                        </h3>
                    </div>
                )}

                {scoreCardState !== ScoreCardState.Closed && (
                    <Button
                        className={styles.cancelButton}
                        appearance={ButtonAppearance.TransparentWhite}
                        size={ButtonSize.Block}
                        clickHandler={goBack}
                    >
                        {scoreCardState === ScoreCardState.Set
                            ? 'Cancel'
                            : scoreCardState === ScoreCardState.Saved ||
                              scoreCardState === ScoreCardState.Repeated ||
                              scoreCardState === ScoreCardState.Disabled
                            ? 'Close'
                            : 'Go back'}
                    </Button>
                )}
            </div>
        </>
    );
}
