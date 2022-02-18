import { useModal } from '@clemann-developments/react/hooks/use-modal';
import { PencilAltIcon } from '@heroicons/react/outline';
import ordinal from 'ordinal';
import React, { createContext, useState } from 'react';
import { CourtDto } from '../../../../api-services/manager/models';
import Pill, {
    PillColor
} from '../../../../components/ui-elements/pill/pill.component';
import UpdateCourtNumberModal from './update-court-number.modal';
import WeekCourtPlayerView from './week-court-player-view.component';
import WeekCourtSetView from './week-court-set-view.component';
import styles from './week-court.module.scss';

export type WeekCourtProps = {
    court: CourtDto;
    courtCount: number;
    refreshWeekData: () => void;
};

export type ManagerWeekCourtContext = {
    court: CourtDto;
    refreshWeekData: () => void;
    showSetView: boolean;
    setShowSetView: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ManagerWeekCourtContext =
    createContext<ManagerWeekCourtContext>(null);

export default function WeekCourt({
    court,
    courtCount,
    refreshWeekData
}: WeekCourtProps) {
    const { showModal, closeModal } = useModal();

    const [showSetView, setShowSetView] = useState(false);

    return (
        <div className={styles.weekCourt}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <h3
                    className={styles.courtName}
                    onClick={() =>
                        showModal(
                            <UpdateCourtNumberModal
                                court={court}
                                onSubmit={() => {
                                    refreshWeekData();
                                    closeModal();
                                }}
                            ></UpdateCourtNumberModal>
                        )
                    }
                >
                    Court {court.courtNumber}
                    <PencilAltIcon></PencilAltIcon>
                </h3>
                <Pill color={PillColor.Black} lightFont={true}>
                    {court.courtPosition === 1
                        ? 'Top Court'
                        : court.courtPosition === courtCount
                        ? 'Bottom Court'
                        : `${ordinal(court.courtPosition)} Court`}
                </Pill>
            </div>

            <ManagerWeekCourtContext.Provider
                value={{
                    court,
                    refreshWeekData,
                    showSetView,
                    setShowSetView
                }}
            >
                {showSetView ? (
                    <WeekCourtSetView></WeekCourtSetView>
                ) : (
                    <WeekCourtPlayerView></WeekCourtPlayerView>
                )}
            </ManagerWeekCourtContext.Provider>
        </div>
    );
}
