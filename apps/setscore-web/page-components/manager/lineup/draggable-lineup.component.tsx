import React, { useContext } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { LineupDto } from '../../../api-services/manager/lineup/getLineup.service';
import Loading from '../../../components/navigation/loading/loading.component';
import { ManagerLineupContext } from '../../../pages/manager/lineup/[[...weekId]]';
import styles from './draggable-lineup.module.scss';
import LineupCourt from './lineup-court.component';
import UnassignedPlayers from './unassigned-players.component';

export default function DraggableLineup(props: any) {
    const {
        lineup,
        setLineup,
        saveLineup,
        isSubmitting,
        hasChanges,
        setHasChanges
    } = useContext(ManagerLineupContext);

    const movePlayerToUnassigned = (
        startingDroppableId: string,
        startingIndex: number,
        endingIndex: number
    ) => {
        setLineup((oldLineup: LineupDto) => {
            const oldCourt = oldLineup.courts.find(
                (court) => court.courtId === startingDroppableId
            );

            const movedPlayer = oldCourt.players[startingIndex];

            oldCourt.players.splice(startingIndex, 1);

            oldLineup.unassignedPlayers.splice(endingIndex, 0, movedPlayer);
            return oldLineup;
        });
    };

    const movePlayerToCourtFromUnassigned = (
        startingIndex: number,
        endingDroppableId: string,
        endingIndex: number
    ) => {
        setLineup((oldLineup: LineupDto) => {
            const newCourt = oldLineup.courts.find(
                (court) => court.courtId === endingDroppableId
            );
            const movedPlayer = oldLineup.unassignedPlayers[startingIndex];

            oldLineup.unassignedPlayers.splice(startingIndex, 1);
            newCourt.players.splice(endingIndex, 0, movedPlayer);
            return oldLineup;
        });
    };
    const movePlayerBetweenCourts = (
        startingDroppableId: string,
        startingIndex: number,
        endingDroppableId: string,
        endingIndex: number
    ) => {
        setLineup((oldLineup: LineupDto) => {
            const oldCourt = oldLineup.courts.find(
                (court) => court.courtId === startingDroppableId
            );
            const newCourt = oldLineup.courts.find(
                (court) => court.courtId === endingDroppableId
            );
            const movedPlayer = oldCourt.players[startingIndex];

            oldCourt.players.splice(startingIndex, 1);
            newCourt.players.splice(endingIndex, 0, movedPlayer);
            return oldLineup;
        });
    };

    const reorderUnassignedPlayers = (
        startingIndex: number,
        endingIndex: number
    ) => {
        setLineup((oldLineup: LineupDto) => {
            const movedPlayer = oldLineup.unassignedPlayers[startingIndex];
            oldLineup.unassignedPlayers.splice(startingIndex, 1);
            oldLineup.unassignedPlayers.splice(endingIndex, 0, movedPlayer);
            return oldLineup;
        });
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination || lineup.isLineupLocked) {
            return;
        }

        if (
            result.destination.droppableId === 'unassigned-players' &&
            result.source.droppableId === 'unassigned-players'
        ) {
            reorderUnassignedPlayers(
                result.source.index,
                result.destination.index
            );
        } else if (result.destination.droppableId === 'unassigned-players') {
            movePlayerToUnassigned(
                result.source.droppableId,
                result.source.index,
                result.destination.index
            );
            setHasChanges(true);
        } else if (result.source.droppableId === 'unassigned-players') {
            movePlayerToCourtFromUnassigned(
                result.source.index,
                result.destination.droppableId,
                result.destination.index
            );
            setHasChanges(true);
        } else {
            movePlayerBetweenCourts(
                result.source.droppableId,
                result.source.index,
                result.destination.droppableId,
                result.destination.index
            );
            setHasChanges(true);
        }
    };

    return (
        <>
            {lineup ? (
                <>
                    {lineup?.courts?.length > 0 ? (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div
                                className={`${styles.courtsWrapper} ${
                                    isSubmitting ? styles.isSubmitting : ''
                                }`}
                            >
                                <div className="row">
                                    <div
                                        className="col-12 col-md-6 col-lg-8 col-xl-9"
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <div className="row">
                                            {lineup.courts.map(
                                                (court, index) => (
                                                    <div
                                                        className="col-12 col-lg-6 col-xl-4"
                                                        key={index}
                                                        style={{
                                                            marginBottom: '2rem'
                                                        }}
                                                    >
                                                        <LineupCourt
                                                            court={court}
                                                        ></LineupCourt>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="col-12 col-md-6 col-lg-4 col-xl-3"
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <UnassignedPlayers
                                            unassignedPlayers={
                                                lineup.unassignedPlayers
                                            }
                                        ></UnassignedPlayers>
                                    </div>
                                </div>
                            </div>
                        </DragDropContext>
                    ) : (
                        <div>
                            <h3>No Lineup</h3>
                            <p>
                                You can create a lineup by clicking the button
                                below.
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <Loading></Loading>
            )}
        </>
    );
}
