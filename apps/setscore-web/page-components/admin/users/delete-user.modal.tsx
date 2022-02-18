import { useModal, Modal, ModalHeader, ModalFooter } from '@clemann-developments/react/hooks/use-modal';
import React from 'react';
import { toast } from 'react-toastify';
import useDeleteUser from '../../../api-services/admin/users/deleteUser.service';
import { User } from '../../../api-services/entities/user.entity';
import DataBox from '../../../components/ui-elements/data-box/data-box.component';
import DataPoint from '../../../components/ui-elements/data-point/data-point.component';

export default function DeleteUserModal({
    user,
    onSubmit
}: {
    user: User;
    onSubmit: () => void;
}) {
    const deleteUser = useDeleteUser();
    const { closeModal } = useModal();

    return (
        <Modal>
            <ModalHeader>Delete User</ModalHeader>
            <p style={{ marginBottom: '2rem' }}>
                Are you sure you want to delete the following user?
            </p>

            <DataBox>
                <DataPoint label={user.firstName + ' ' + user.lastName}>
                    {user.userId}
                </DataPoint>
            </DataBox>

            <ModalFooter
                okButtonText="Delete"
                onOkClick={async () => {
                    try {
                        await deleteUser.mutateAsync({
                            userId: user.userId
                        });
                        closeModal();
                        onSubmit();
                        toast.success('User successfully deleted');
                    } catch {}
                }}
                isDangerButton
            ></ModalFooter>
        </Modal>
    );
}
