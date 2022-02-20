import { XIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Input } from '@clemann-developments/react/components/forms';
import Pill, {
    PillColor
} from '../../../../components/ui-elements/pill/pill.component';
import styles from './week-score-edit-card.module.scss';
import * as Yup from 'yup';
import { ManagerWeekCourtContext } from './week-court.component';
import useUpdatePlayerAdjustedTotal from '../../../../api-services/manager/week/updatePlayerAdjustedTotal.service';
import { PlayerDto } from '../../../../api-services/manager/models';
import {
    Button,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';

export default function WeekScoreEditCard({
    player,
    onCancel
}: {
    player: PlayerDto;
    onCancel: () => void;
}) {
    const { refreshWeekData } = useContext(ManagerWeekCourtContext);
    const updatePlayerAdjustedTotal = useUpdatePlayerAdjustedTotal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className={styles.scoreEdit}>
            <div className={styles.scoreEditHeader}>
                <div>
                    <h4
                        style={{
                            marginBottom: player?.subUserId ? '0' : '1.6rem'
                        }}
                    >
                        {player.firstName} {player.lastName}
                    </h4>
                    {player.subUserId && (
                        <Pill color={PillColor.Black} lightFont small>
                            {player.subName}
                        </Pill>
                    )}
                </div>
                <XIcon
                    height="24"
                    onClick={() => {
                        onCancel();
                    }}
                ></XIcon>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <p style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                    Adjust player scores
                </p>
                {player.adjustedTotalScore && (
                    <Pill color={PillColor.Yellow} small>
                        Total is adjusted
                    </Pill>
                )}
            </div>
            <Formik
                initialValues={{
                    set1: player.set1Score,
                    set2: player.set2Score,
                    set3: player.set3Score,
                    total:
                        player.adjustedTotalScore !== null
                            ? player.adjustedTotalScore
                            : player.totalScore
                }}
                validationSchema={Yup.object({
                    total: Yup.number().max(21).min(0)
                })}
                onSubmit={async (values) => {
                    setIsSubmitting(true);
                    const adjustedTotal =
                        values.total ===
                        (player.set1Score || 0) +
                            (player.set2Score || 0) +
                            (player.set3Score || 0)
                            ? null
                            : values.total;

                    await updatePlayerAdjustedTotal.mutateAsync({
                        playerId: player.playerId,
                        adjustedTotal
                    });
                    await refreshWeekData();
                    setIsSubmitting(false);
                }}
            >
                <Form>
                    <div className="row">
                        <div className="col-3">
                            <Input
                                name="set1"
                                label="Set 1"
                                type="number"
                                disabled
                                placeholder="-"
                                min={0}
                                max={7}
                                hideErrorMessage
                                style={{ marginBottom: '1rem' }}
                            ></Input>
                        </div>
                        <div className="col-3">
                            <Input
                                name="set2"
                                label="Set 2"
                                type="number"
                                placeholder="-"
                                min={0}
                                max={7}
                                disabled
                                hideErrorMessage
                                style={{ marginBottom: '1rem' }}
                            ></Input>
                        </div>
                        <div className="col-3">
                            <Input
                                name="set3"
                                label="Set 3"
                                type="number"
                                placeholder="-"
                                min={0}
                                max={7}
                                disabled
                                hideErrorMessage
                                style={{ marginBottom: '1rem' }}
                            ></Input>
                        </div>
                        <div className="col-3">
                            <Input
                                name="total"
                                label="Total"
                                type="number"
                                hideErrorMessage
                                min={0}
                                max={21}
                                style={{ marginBottom: '1rem' }}
                            ></Input>
                        </div>
                        <div className="col-12">
                            <Button
                                size={ButtonSize.Block}
                                type="submit"
                                style={{ height: '3rem' }}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Form>
            </Formik>

            <div className={styles.scoreEditInput}></div>
        </div>
    );
}
