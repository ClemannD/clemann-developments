import {
    Modal,
    ModalFooter,
    ModalHeader
} from '@clemann-developments/react/hooks/use-modal';
import ordinal from 'ordinal';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { CourtDto } from '../../../api-services/manager/models';
import useUpdateCourtOrder from '../../../api-services/manager/week/updateCourtOrder.service';
import DataBox from '../../../components/ui-elements/data-box/data-box.component';
import Pill, {
    PillColor
} from '../../../components/ui-elements/pill/pill.component';
import styles from './update-court-order.module.scss';

export default function UpdateCourtOrderModal({
    courts,
    onSubmit
}: {
    courts: CourtDto[];
    onSubmit: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const updateCourtOrder = useUpdateCourtOrder();

    // useEffect(() => {
    //     setCourtOrder(courts.map((court) => court.courtId));
    // }, [courts]);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        courts.splice(
            result.destination.index,
            0,
            courts.splice(result.source.index, 1)[0]
        );
    };

    return (
        <Modal>
            <ModalHeader>Change court order</ModalHeader>
            <p style={{ marginBottom: '1rem' }}>
                Drag the courts to change the order
            </p>
            <DataBox style={{ paddingBottom: '.5rem' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="courtOrder">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {courts.map((court, index) => (
                                    <Draggable
                                        key={court.courtId}
                                        draggableId={court.courtId}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                className={`cardBox actionable ${styles.courtRow}`}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <span>
                                                    Court {court.courtNumber}
                                                </span>
                                                <Pill
                                                    color={PillColor.OffWhite}
                                                >
                                                    {index + 1 === 1
                                                        ? 'Top Court'
                                                        : index + 1 ===
                                                          courts.length
                                                        ? 'Bottom Court'
                                                        : `${ordinal(
                                                              index + 1
                                                          )} Court`}
                                                </Pill>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </DataBox>
            <ModalFooter
                isSubmitting={isSubmitting}
                okButtonText="Save court order"
                onOkClick={async () => {
                    setIsSubmitting(true);
                    const courtPositions = courts.map((court, index) => ({
                        courtId: court.courtId,
                        courtPosition: index + 1
                    }));

                    await updateCourtOrder.mutateAsync({
                        courtPositions
                    });

                    setIsSubmitting(false);
                    onSubmit();
                }}
            ></ModalFooter>
        </Modal>
    );
}
