import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import {
    CourtDto,
    PlayerDto,
    SetDto
} from '../../../../api-services/manager/models';
import useCreateOrUpdateSet from '../../../../api-services/manager/week/createOrUpdateSet.service';

import Input from '../../../../components/forms/input/input.component';
import OnFormChangeHandler from '../../../../components/forms/on-form-change-handler.component';
import Toggle from '../../../../components/forms/toggle/toggle.component';
import ModalFooter from '../../../../components/modal/modal-footer/modal-footer.component';
import ModalHeader from '../../../../components/modal/modal-header/modal-header.component';
import Modal from '../../../../components/modal/modal.component';
import Label from '../../../../components/ui-elements/label/label.component';
import TeamScore from '../../../../components/ui-elements/team-score/team-score.component';
import useWindowSize from '../../../../hooks/useWindowDimensions';

export default function AdjustSetScoreModal({
    set,
    setNumber,
    court,
    onSubmit
}: {
    set: SetDto;
    setNumber: number;
    court: CourtDto;
    onSubmit: () => void;
}) {
    const { smallBelow } = useWindowSize();
    const createOrUpdateSet = useCreateOrUpdateSet();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [displaySet, setDisplaySet] = useState<SetDto>(null);

    useEffect(() => {
        setDisplaySet({
            setNumber: setNumber,
            setId: set?.setId || null,
            team1: {
                player1Id: set?.team1?.player1Id || null,
                player1Name: set?.team1?.player1Name || null,
                player2Id: set?.team1?.player2Id || null,
                player2Name: set?.team1?.player2Name || null,
                score: set?.team1?.score || null
            },
            team2: {
                player1Id: set?.team2?.player1Id || null,
                player1Name: set?.team2?.player1Name || null,
                player2Id: set?.team2?.player2Id || null,
                player2Name: set?.team2?.player2Name || null,
                score: set?.team2?.score || null
            }
        });
    }, [set]);

    const togglePlayer = (player: PlayerDto, checked: boolean) => {
        setDisplaySet((oldDisplaySet) => {
            if (checked) {
                if (
                    !!oldDisplaySet.team1.player1Id &&
                    !!oldDisplaySet.team1.player2Id
                ) {
                    // do nothing
                }
                if (oldDisplaySet.team1.player1Id === null) {
                    const newDisplaySet = {
                        ...oldDisplaySet,
                        team1: {
                            ...oldDisplaySet.team1,
                            player1Id: player.playerId,
                            player1Name:
                                player.firstName + ' ' + player.lastName
                        }
                    };

                    if (oldDisplaySet.team1.player2Id !== null) {
                        const team2Players = court.players.filter(
                            (p) =>
                                p.playerId !== newDisplaySet.team1.player1Id ||
                                p.playerId !== newDisplaySet.team1.player2Id
                        );
                        newDisplaySet.team2 = {
                            ...oldDisplaySet.team2,
                            player1Id: team2Players[0].playerId,
                            player1Name:
                                team2Players[0].firstName +
                                ' ' +
                                team2Players[0].lastName,
                            player2Id: team2Players[1].playerId,
                            player2Name:
                                team2Players[1].firstName +
                                ' ' +
                                team2Players[1].lastName
                        };
                    }
                    return newDisplaySet;
                }
                if (oldDisplaySet.team1.player2Id === null) {
                    const newDisplaySet = {
                        ...oldDisplaySet,
                        team1: {
                            ...oldDisplaySet.team1,
                            player2Id: player.playerId,
                            player2Name:
                                player.firstName + ' ' + player.lastName
                        }
                    };

                    if (oldDisplaySet.team1.player1Id !== null) {
                        const team2Players = court.players.filter(
                            (p) =>
                                p.playerId !== newDisplaySet.team1.player1Id &&
                                p.playerId !== newDisplaySet.team1.player2Id
                        );
                        newDisplaySet.team2 = {
                            ...oldDisplaySet.team2,
                            player1Id: team2Players[0].playerId,
                            player1Name:
                                team2Players[0].firstName +
                                ' ' +
                                team2Players[0].lastName,
                            player2Id: team2Players[1].playerId,
                            player2Name:
                                team2Players[1].firstName +
                                ' ' +
                                team2Players[1].lastName
                        };
                    }
                    return newDisplaySet;
                }
            } else {
                if (
                    oldDisplaySet.team1.player1Id === player.playerId ||
                    oldDisplaySet.team1.player2Id === player.playerId
                ) {
                    if (oldDisplaySet.team1.player1Id === player.playerId) {
                        return {
                            ...oldDisplaySet,
                            team1: {
                                ...oldDisplaySet.team1,
                                player1Id: null,
                                player1Name: null
                            },
                            team2: {
                                ...oldDisplaySet.team2,
                                player1Id: null,
                                player1Name: null,
                                player2Id: null,
                                player2Name: null
                            }
                        };
                    }
                    if (oldDisplaySet.team1.player2Id === player.playerId) {
                        return {
                            ...oldDisplaySet,
                            team1: {
                                ...oldDisplaySet.team1,
                                player2Id: null,
                                player2Name: null
                            },
                            team2: {
                                ...oldDisplaySet.team2,
                                player1Id: null,
                                player1Name: null,
                                player2Id: null,
                                player2Name: null
                            }
                        };
                    }
                }
            }
            return oldDisplaySet;
        });
    };

    return (
        <Modal width={!smallBelow ? '40rem' : null}>
            <ModalHeader>
                {set ? 'Edit' : 'Add'} Scores for Court {court.courtNumber} -
                Set {setNumber}
            </ModalHeader>

            {displaySet && (
                <>
                    <TeamScore
                        setNumber={1}
                        set={displaySet}
                        showEmptySet
                    ></TeamScore>

                    <Label
                        style={{
                            marginTop: '2rem',
                            marginBottom: '1rem'
                        }}
                        label="Team 1 Players"
                        subLabel="Select the players for the first team"
                    ></Label>

                    {court.players.map((player, index) => (
                        <Toggle
                            key={player.playerId}
                            label={
                                court.players[index].firstName +
                                ' ' +
                                court.players[index].lastName
                            }
                            checked={
                                set?.team1?.player1Id ===
                                    court.players[index].playerId ||
                                set?.team1?.player2Id ===
                                    court.players[index].playerId
                            }
                            disabled={
                                !!displaySet.team1.player1Id &&
                                !!displaySet.team1.player2Id &&
                                player.playerId !==
                                    displaySet.team1.player1Id &&
                                player.playerId !== displaySet.team1.player2Id
                            }
                            onChange={(checked) => {
                                togglePlayer(court.players[index], checked);
                            }}
                        ></Toggle>
                    ))}

                    <div
                        style={{
                            marginTop: '2rem'
                        }}
                    >
                        <Formik
                            initialValues={{
                                team1Score: set?.team1?.score || 0,
                                team2Score: set?.team2?.score || 0
                            }}
                            validationSchema={Yup.object().shape({
                                team1Score: Yup.number()
                                    .min(0)
                                    .max(7)
                                    .required(),
                                team2Score: Yup.number()
                                    .min(0)
                                    .max(7)
                                    .required()
                            })}
                            onSubmit={async (_) => {
                                setIsSubmitting(true);
                                try {
                                    await createOrUpdateSet.mutateAsync({
                                        courtId: court.courtId,
                                        set: displaySet
                                    });
                                    toast.success(
                                        `Set ${setNumber} for Court ${court.courtNumber} has been saved`
                                    );
                                } catch {
                                    toast.error(
                                        `Error saving set ${setNumber} for Court ${court.courtNumber}`
                                    );
                                }
                                onSubmit();
                                setIsSubmitting(false);
                            }}
                        >
                            <Form>
                                <OnFormChangeHandler
                                    onChange={(values) => {
                                        setDisplaySet((oldDisplaySet) => {
                                            const newDisplaySet = {
                                                ...oldDisplaySet,
                                                team1: {
                                                    ...oldDisplaySet.team1,
                                                    score: values.team1Score
                                                },
                                                team2: {
                                                    ...oldDisplaySet.team2,
                                                    score: values.team2Score
                                                }
                                            };
                                            return newDisplaySet;
                                        });
                                    }}
                                />
                                <div className="row">
                                    <div className="col-6">
                                        <Input
                                            name="team1Score"
                                            label="Team 1 Score"
                                            type="number"
                                            max={7}
                                            min={0}
                                        ></Input>
                                    </div>
                                    <div className="col-6">
                                        <Input
                                            name="team2Score"
                                            label="Team 2 Score"
                                            type="number"
                                            max={7}
                                            min={0}
                                        ></Input>
                                    </div>
                                </div>
                                <ModalFooter
                                    okButtonText="Save Score"
                                    okButtonType="submit"
                                    isSubmitting={isSubmitting}
                                    okButtonDisabled={
                                        !displaySet.team1.player1Id ||
                                        !displaySet.team1.player2Id
                                    }
                                ></ModalFooter>
                            </Form>
                        </Formik>
                    </div>
                </>
            )}
        </Modal>
    );
}
