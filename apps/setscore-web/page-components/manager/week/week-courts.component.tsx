import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/component/button';
import { useModal } from '@clemann-developments/react/hooks/use-modal';
import { useWindowSize } from '@clemann-developments/react/hooks/use-window-dimensions';
import { PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React from 'react';
import { WeekDto } from '../../../api-services/manager/week/getWeek.service';
import WeekCourt from './court/week-court.component';
import CreateCourtModal from './create-court.modal';
import UpdateCourtOrderModal from './update-court-order.modal';
import styles from './week-courts.module.scss';

export type WeekCourtsProps = {
    week: WeekDto;
    refreshWeekData: () => void;
};

export default function WeekCourts({ week, refreshWeekData }: WeekCourtsProps) {
    const { showModal, closeModal } = useModal();
    const router = useRouter();
    const { smallBelow } = useWindowSize();

    return (
        <>
            <div className={styles.weekControls}>
                <Button
                    style={{ marginRight: '1rem' }}
                    appearance={ButtonAppearance.Primary}
                    size={smallBelow ? ButtonSize.Block : ButtonSize.Medium}
                    clickHandler={() => {
                        router.push(`/manager/lineup/${week.weekId}`);
                    }}
                >
                    Adjust Lineup
                </Button>
                <Button
                    appearance={ButtonAppearance.Secondary}
                    size={smallBelow ? ButtonSize.Block : ButtonSize.Auto}
                    clickHandler={() => {
                        showModal(
                            <UpdateCourtOrderModal
                                courts={week.courts}
                                onSubmit={() => {
                                    refreshWeekData();
                                    closeModal();
                                }}
                            ></UpdateCourtOrderModal>
                        );
                    }}
                >
                    Change court order
                </Button>
            </div>
            <div
                className={`${styles.courtsRow} row`}
                style={{ marginTop: '2rem' }}
            >
                {week.courts.length ? (
                    <>
                        {week.courts.map((court) => (
                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={court.courtId}
                            >
                                <WeekCourt
                                    court={court}
                                    courtCount={week.courts.length}
                                    refreshWeekData={refreshWeekData}
                                />
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="col-12 col-md-6 col-xl-4">
                        <div
                            className={`cardBox ${styles.courtBox} ${styles.noCourtBox}`}
                        >
                            <h5>
                                This week has no courts. Add one to get started.
                            </h5>
                        </div>
                    </div>
                )}
                <div className="col-12 col-md-6 col-xl-4">
                    <div
                        style={{
                            marginTop: '4.5rem'
                        }}
                        className={`cardBox actionable ${styles.courtBox} ${styles.addCourtBox}`}
                        onClick={() =>
                            showModal(
                                <CreateCourtModal
                                    week={week}
                                    onSubmit={() => {
                                        refreshWeekData();
                                        closeModal();
                                    }}
                                />
                            )
                        }
                    >
                        <h5>Add Court</h5>
                        <PlusIcon></PlusIcon>
                    </div>
                </div>
            </div>
        </>
    );
}
