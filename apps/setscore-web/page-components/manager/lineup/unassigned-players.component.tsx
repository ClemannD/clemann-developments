import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { LineupPlayerDto } from '../../../api-services/manager/lineup/getLineup.service';
import DraggablePlayer from './draggable-player.component';
import styles from './unassigned-players.module.scss';

export default function UnassignedPlayers({
    unassignedPlayers
}: {
    unassignedPlayers: LineupPlayerDto[];
}) {
    return (
        <div>
            <h3
                style={{
                    marginBottom: '1rem'
                }}
            >
                Not Playing
            </h3>
            <Droppable droppableId="unassigned-players">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${styles.playersBox} cardBox ${
                            unassignedPlayers.length === 0 ? styles.empty : ''
                        }`}
                    >
                        {unassignedPlayers.length > 0 ? (
                            unassignedPlayers?.map((player, index) => (
                                <DraggablePlayer
                                    key={index}
                                    player={player}
                                    index={index}
                                    highlightOverflow={false}
                                ></DraggablePlayer>
                            ))
                        ) : (
                            <p className={styles.noPlayers}>
                                All Players are assigned
                            </p>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
