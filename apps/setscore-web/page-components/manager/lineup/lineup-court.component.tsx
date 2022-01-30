import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { LineupCourtDto } from '../../../api-services/manager/lineup/getLineup.service';
import DraggablePlayer from './draggable-player.component';
import styles from './lineup-court.module.scss';

export type CourtProps = {
    court?: LineupCourtDto;
};

export default function LineupCourt({ court }: CourtProps) {
    return (
        <div className={`${styles.lineupCourt}`}>
            <h3 className={styles.courtName}>Court {court.courtNumber}</h3>

            <Droppable droppableId={court.courtId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${styles.playerBox} cardBox ${
                            court.players.length === 0 ? styles.empty : ''
                        }`}
                    >
                        {court.players.length > 0 ? (
                            court.players?.map((player, index) => (
                                <DraggablePlayer
                                    key={index}
                                    player={player}
                                    index={index}
                                ></DraggablePlayer>
                            ))
                        ) : (
                            <p className={styles.noPlayers}>Empty Court</p>
                        )}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
