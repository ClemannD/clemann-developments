import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { LineupPlayerDto } from '../../../api-services/manager/lineup/getLineup.service';
import useListSubs from '../../../api-services/manager/lineup/listSubs.service';
import useUpdatePlayerSub from '../../../api-services/manager/lineup/updatePlayerSub.service';
import Select from '../../../components/forms/select/select.component';
import ModalFooter from '../../../components/modal/modal-footer/modal-footer.component';
import ModalHeader from '../../../components/modal/modal-header/modal-header.component';
import Modal from '../../../components/modal/modal.component';
import Loading from '../../../components/navigation/loading/loading.component';
import DataBox from '../../../components/ui-elements/data-box/data-box.component';
import DataPoint from '../../../components/ui-elements/data-point/data-point.component';
import { ManagerLineupContext } from '../../../pages/manager/lineup/[[...weekId]]';

export default function UpdatePlayerSubModal({
    player,
    lineupHasChanges,
    onSubmit
}: {
    player: LineupPlayerDto;
    lineupHasChanges: boolean;
    onSubmit: () => void;
}) {
    const updatePlayerSub = useUpdatePlayerSub();
    const listSubs = useListSubs();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        listSubs.mutateAsync({});
    }, []);

    return (
        <Modal>
            <ModalHeader>Update Sub for Player</ModalHeader>
            <DataBox
                style={{
                    marginBottom: '2rem'
                }}
            >
                <DataPoint label={'Player'}>
                    {player.firstName} {player.lastName}
                </DataPoint>
            </DataBox>

            {listSubs.data ? (
                <Formik
                    initialValues={{
                        subUserId: player.subUserId
                    }}
                    onSubmit={async (values) => {
                        setIsSubmitting(true);
                        await updatePlayerSub.mutateAsync({
                            playerId: player.playerId,
                            subUserId:
                                values.subUserId === ''
                                    ? null
                                    : values.subUserId
                        });
                        onSubmit();
                        setIsSubmitting(false);
                    }}
                >
                    <Form>
                        <Select
                            name={'subUserId'}
                            label="Sub"
                            subLabel="Select the person that will play in this person's place"
                        >
                            <option value={''}>No Sub</option>
                            {listSubs.data?.subs?.map((sub) => (
                                <option
                                    key={sub.subUserId}
                                    value={sub.subUserId}
                                >
                                    {sub.subName}
                                </option>
                            ))}
                        </Select>
                        <p>
                            If you do not see the sub you are looking for, you
                            must first add them on the Players page
                        </p>
                        <ModalFooter
                            isSubmitting={isSubmitting}
                            okButtonText={`${
                                lineupHasChanges ? 'Save Lineup & ' : ''
                            } Update Sub`}
                            okButtonType="submit"
                        ></ModalFooter>
                    </Form>
                </Formik>
            ) : (
                <Loading></Loading>
            )}
        </Modal>
    );
}
