import { Form, Formik } from 'formik';
import React from 'react';
import {
    LeagueMemberType,
    UserToLeague
} from '../../../../api-services/entities/userToLeague.entity';
import useUpdateLeagueMemberType from '../../../../api-services/manager/players/updateLeagueMemberType.service';
import LeagueMemberTypeSelect from '../../../../components/forms/league-member-type-select/league-member-type-select.component';
import Select from '../../../../components/forms/select/select.component';
import ModalFooter from '../../../../components/modal/modal-footer/modal-footer.component';
import ModalHeader from '../../../../components/modal/modal-header/modal-header.component';
import Modal from '../../../../components/modal/modal.component';
import DataBox from '../../../../components/ui-elements/data-box/data-box.component';
import DataPoint from '../../../../components/ui-elements/data-point/data-point.component';
import useModal from '../../../../hooks/useModal';

export default function UpdateMemberType({
    userToLeague,
    onSubmit
}: {
    userToLeague: UserToLeague;
    onSubmit?: () => void;
}) {
    const updateLeagueMemberType = useUpdateLeagueMemberType();
    const { closeModal } = useModal();

    return (
        <Modal>
            <ModalHeader>Update Member Type</ModalHeader>
            <Formik
                initialValues={{
                    leagueMemberType: userToLeague.leagueMemberType
                }}
                onSubmit={async (values) => {
                    await updateLeagueMemberType.mutateAsync({
                        userId: userToLeague.userId,
                        leagueId: userToLeague.leagueId,
                        leagueMemberType: values.leagueMemberType
                    });
                    if (onSubmit) {
                        onSubmit();
                    }
                    closeModal();
                }}
            >
                <>
                    <DataBox style={{ marginBottom: '2rem' }}>
                        <DataPoint label="Player">
                            <>
                                {userToLeague.user.firstName}{' '}
                                {userToLeague.user.lastName}
                            </>
                        </DataPoint>
                    </DataBox>
                    <Form>
                        <LeagueMemberTypeSelect></LeagueMemberTypeSelect>

                        <ModalFooter
                            isSubmitting={updateLeagueMemberType.isLoading}
                            okButtonText="Update"
                            okButtonType="submit"
                        ></ModalFooter>
                    </Form>
                </>
            </Formik>
        </Modal>
    );
}
