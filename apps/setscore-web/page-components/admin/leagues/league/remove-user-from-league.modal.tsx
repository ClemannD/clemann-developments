import { toast } from 'react-toastify';
import useRemoveUserFromLeague from '../../../../api-services/admin/leagues/removeUserFromLeague.service';
import { League } from '../../../../api-services/entities/league.entity';
import { User } from '../../../../api-services/entities/user.entity';
import ModalFooter from '../../../../components/modal/modal-footer/modal-footer.component';
import ModalHeader from '../../../../components/modal/modal-header/modal-header.component';
import Modal from '../../../../components/modal/modal.component';
import DataBox from '../../../../components/ui-elements/data-box/data-box.component';
import DataPoint from '../../../../components/ui-elements/data-point/data-point.component';
import useModal from '../../../../hooks/useModal';

export default function RemoveUserFromLeagueModal({
    user,
    league,
    onSubmit
}: {
    user: User;
    league: League;
    onSubmit: () => void;
}) {
    const { closeModal } = useModal();
    const removeUserFromLeague = useRemoveUserFromLeague();

    return (
        <Modal>
            <ModalHeader>Remove user from league</ModalHeader>
            <p style={{ marginBottom: '2rem' }}>
                Confirm you want to remove the following user from the following
                league
            </p>
            <DataBox style={{ marginBottom: '2rem' }}>
                <DataPoint label="League">{league.name}</DataPoint>
            </DataBox>
            <DataBox>
                <DataPoint label="User">
                    {user.firstName} {user.lastName}
                </DataPoint>
            </DataBox>
            <ModalFooter
                isDangerButton={true}
                okButtonText="Remove"
                onOkClick={async () => {
                    try {
                        await removeUserFromLeague.mutateAsync({
                            leagueId: league.leagueId,
                            userId: user.userId
                        });
                        toast.success('User successfully removed from league');
                        onSubmit();
                        closeModal();
                    } catch {}
                }}
            ></ModalFooter>
        </Modal>
    );
}
