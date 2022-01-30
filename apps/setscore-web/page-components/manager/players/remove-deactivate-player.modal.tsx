import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
    LeagueMemberType,
    UserToLeague
} from '../../../api-services/entities/userToLeague.entity';
import useEditPlayer from '../../../api-services/manager/players/editPlayer.service';
import useRemovePlayer from '../../../api-services/manager/players/removePlayer.service';
import Button, {
    ButtonAppearance,
    ButtonSize
} from '../../../components/buttons/button.component';
import ModalFooter from '../../../components/modal/modal-footer/modal-footer.component';
import ModalHeader from '../../../components/modal/modal-header/modal-header.component';
import Modal from '../../../components/modal/modal.component';
import DataBox from '../../../components/ui-elements/data-box/data-box.component';
import DataPoint from '../../../components/ui-elements/data-point/data-point.component';
import useModal from '../../../hooks/useModal';

export default function RemoveDeactivatePlayerModal({
    userToLeague,
    onSubmit
}: {
    userToLeague: UserToLeague;
    onSubmit: () => void;
}) {
    const { closeModal } = useModal();
    const editPlayer = useEditPlayer();
    const removePlayer = useRemovePlayer();
    const [isSubmittingDeactivate, setIsSubmittingDeactivate] = useState(false);
    const [isSubmittingRemove, setIsSubmittingRemove] = useState(false);

    return (
        <Modal>
            <ModalHeader>Remove or Deactivate Player</ModalHeader>

            <DataBox style={{ marginBottom: '1rem' }}>
                <DataPoint
                    label={`${userToLeague.user.firstName} ${userToLeague.user.lastName}`}
                >
                    {userToLeague.user.email}
                </DataPoint>
            </DataBox>

            <p style={{ marginBottom: '1rem' }}>
                Making a player <b>Inactive</b> keeps them associated to the
                league, but they can not view any league information or interact
                with the league in any way. You can reactivate them again in the
                future if need be.
            </p>
            <Button
                style={{ marginBottom: '1rem' }}
                isSubmitting={isSubmittingDeactivate}
                isDisabled={
                    userToLeague.leagueMemberType ===
                        LeagueMemberType.Inactive || isSubmittingRemove
                }
                appearance={ButtonAppearance.Secondary}
                size={ButtonSize.Block}
                clickHandler={async () => {
                    setIsSubmittingDeactivate(true);

                    try {
                        await editPlayer.mutateAsync({
                            firstName: userToLeague.user.firstName,
                            lastName: userToLeague.user.lastName,
                            email: userToLeague.user.email,
                            phone: userToLeague.user.phone,
                            leagueMemberType: LeagueMemberType.Inactive,
                            userId: userToLeague.user.userId
                        });
                        toast.success('Player made inactive');
                        if (onSubmit) {
                            onSubmit();
                        }
                        closeModal();
                    } catch {}
                    setIsSubmittingDeactivate(false);
                }}
            >
                Deactivate Player
            </Button>

            <p style={{ marginBottom: '1rem' }}>
                Removing a player disassociates them from the league, and they
                can no longer be reactivated without inviting them to the league
                again.
            </p>
            <Button
                isSubmitting={isSubmittingRemove}
                isDisabled={isSubmittingDeactivate}
                appearance={ButtonAppearance.Danger}
                size={ButtonSize.Block}
                clickHandler={async () => {
                    setIsSubmittingRemove(true);

                    try {
                        await removePlayer.mutateAsync({
                            userId: userToLeague.user.userId
                        });
                        toast.success('Player removed from league');
                        if (onSubmit) {
                            onSubmit();
                        }
                        closeModal();
                    } catch {}
                    setIsSubmittingRemove(false);
                }}
            >
                Remove Player from League
            </Button>

            <ModalFooter hideOkButton={true}></ModalFooter>
        </Modal>
    );
}
