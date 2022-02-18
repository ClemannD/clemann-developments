import { useModal } from '@clemann-developments/react/hooks/use-modal';
import { useContext } from 'react';
import TeamScore from '../../../../components/ui-elements/team-score/team-score.component';
import AdjustSetScoreModal from './adjust-set-score.modal';
import styles from './week-court-set-view.module.scss';
import { ManagerWeekCourtContext } from './week-court.component';

export default function WeekCourtSetView() {
    const { court, setShowSetView, refreshWeekData } = useContext(
        ManagerWeekCourtContext
    );
    const { showModal, closeModal } = useModal();

    return (
        <>
            <div
                className={styles.switchViewBar}
                onClick={() => {
                    setShowSetView(false);
                }}
            >
                <p className="bold">View Player Scores</p>
            </div>
            <div className={styles.setsView}>
                <div
                    onClick={() => {
                        showModal(
                            <AdjustSetScoreModal
                                set={court.sets[0]}
                                setNumber={1}
                                court={court}
                                onSubmit={() => {
                                    closeModal();
                                    refreshWeekData();
                                }}
                            />
                        );
                    }}
                >
                    <TeamScore
                        style={{
                            marginBottom: '0.2rem'
                        }}
                        setNumber={1}
                        clickable
                        set={court.sets.find((set) => set.setNumber === 1)}
                    ></TeamScore>
                </div>
                <div
                    onClick={() => {
                        showModal(
                            <AdjustSetScoreModal
                                set={court.sets[1]}
                                setNumber={2}
                                court={court}
                                onSubmit={() => {
                                    closeModal();
                                    refreshWeekData();
                                }}
                            />
                        );
                    }}
                >
                    <TeamScore
                        style={{
                            marginBottom: '0.5rem'
                        }}
                        setNumber={2}
                        clickable
                        set={court.sets.find((set) => set.setNumber === 2)}
                    ></TeamScore>
                </div>
                <div
                    onClick={() => {
                        showModal(
                            <AdjustSetScoreModal
                                set={court.sets.find(
                                    (set) => set.setNumber === 3
                                )}
                                setNumber={3}
                                court={court}
                                onSubmit={() => {
                                    closeModal();
                                    refreshWeekData();
                                }}
                            />
                        );
                    }}
                >
                    <TeamScore
                        setNumber={3}
                        clickable
                        set={court.sets[2]}
                    ></TeamScore>
                </div>
            </div>
        </>
    );
}
