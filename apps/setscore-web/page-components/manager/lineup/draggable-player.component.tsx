import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useModal } from '@clemann-developments/react/hooks/use-modal';
import { UsersIcon } from '@heroicons/react/solid';
import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { LineupPlayerDto } from '../../../api-services/manager/lineup/getLineup.service';
import { ManagerLineupContext } from '../../../pages/manager/lineup/[[...weekId]]';
import styles from './draggable-player.module.scss';
import UpdatePlayerSubModal from './upadte-player-sub.modal';

export default function DraggablePlayer({
    player,
    index,
    highlightOverflow = true
}: {
    player: LineupPlayerDto;
    index: number;
    highlightOverflow?: boolean;
}) {
    const { showModal, closeModal } = useModal();
    const { saveLineup, hasChanges, lineup } = useContext(ManagerLineupContext);

    return (
        <Draggable
            key={player.userId}
            draggableId={player.userId}
            index={index}
            isDragDisabled={lineup.isLineupLocked}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    className={styles.draggablePlayer}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div
                        className={`${styles.playerBox} ${
                            highlightOverflow && index > 3 ? styles.extra : ''
                        }`}
                    >
                        <div className={styles.player}>
                            {player.firstName} {player.lastName}
                        </div>
                        <div
                            style={{
                                marginRight: '0.5rem'
                            }}
                            onClick={() => {
                                showModal(
                                    <UpdatePlayerSubModal
                                        player={player}
                                        lineupHasChanges={hasChanges}
                                        onSubmit={() => {
                                            saveLineup();
                                            closeModal();
                                        }}
                                    ></UpdatePlayerSubModal>
                                );
                            }}
                        >
                            {player.subUserId ? (
                                <Pill color={PillColor.Black} lightFont small>
                                    {player.subName}
                                </Pill>
                            ) : (
                                <UsersIcon height={15}></UsersIcon>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
