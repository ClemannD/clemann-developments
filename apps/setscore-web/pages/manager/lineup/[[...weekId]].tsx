import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useGetLineup, {
    LineupDto
} from '../../../api-services/manager/lineup/getLineup.service';
import useUpdateLineup from '../../../api-services/manager/lineup/updateLineup.service';
import Button, {
    ButtonSize
} from '../../../components/buttons/button.component';
import ManagerLayout from '../../../components/layouts/manager-layout/manager-layout.component';
import LineupMetaData from '../../../components/ui-elements/lineup-meta-data/lineup-meta-data.component';
import PageHeaderData from '../../../components/ui-elements/page-header/page-header-data.component';
import PageHeader from '../../../components/ui-elements/page-header/page-header.component';
import CurrentLeagueContext from '../../../context/currentLeague.context';
import useWindowSize from '../../../hooks/useWindowDimensions';
import DraggableLineup from '../../../page-components/manager/lineup/draggable-lineup.component';

export type ManagerLineupContextType = {
    lineup: LineupDto;
    setLineup: React.Dispatch<React.SetStateAction<LineupDto>>;
    saveLineup: () => Promise<void>;
    isSubmitting: boolean;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    hasChanges: boolean;
    setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ManagerLineupContext =
    createContext<ManagerLineupContextType>(null);

export default function Lineup() {
    const currentLeague = useContext(CurrentLeagueContext);
    const [lineup, setLineup] = useState<LineupDto>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [isInvalidLineup, setIsInvalidLineup] = useState<boolean>(false);

    const { largeBelow, smallBelow } = useWindowSize();
    const router = useRouter();

    const getLineup = useGetLineup();
    const updateLineup = useUpdateLineup();

    useEffect(() => {
        fetchLineupData();
    }, [router.query]);

    useEffect(() => {
        setLineup(getLineup.data?.lineup);
    }, [getLineup.data]);

    const fetchLineupData = () => {
        if (router.query.weekId) {
            getLineup.mutate({
                weekId: router.query.weekId[0] as string
            });
        } else {
            getLineup.mutate({
                weekId: null
            });
        }
    };

    const saveLineup = async () => {
        if (lineup.isLineupLocked) {
            fetchLineupData();

            return;
        }

        setIsSubmitting(true);
        const courtUpdates = lineup.courts.map((court) => ({
            courtId: court.courtId,
            players: court.players.map((player) => ({
                playerId: player.playerId,
                userId: player.userId
            }))
        }));

        try {
            await updateLineup.mutateAsync({
                weekId: lineup.weekId,
                courts: courtUpdates
            });
            fetchLineupData();
            toast.success('Lineup has been saved');
        } catch (e) {}

        setHasChanges(false);
        setIsSubmitting(false);
    };

    return (
        <ManagerLineupContext.Provider
            value={{
                lineup,
                setLineup,
                saveLineup,
                isSubmitting,
                setIsSubmitting,
                hasChanges,
                setHasChanges
            }}
        >
            <ManagerLayout>
                <PageHeader
                    subHeader={currentLeague?.name}
                    header="Lineup"
                    backButtonText="Back"
                    backButtonHandler={() => {
                        router.push(`/manager/week/${lineup.weekId}`);
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            marginTop: 'auto'
                        }}
                    >
                        <LineupMetaData
                            weekNumber={lineup?.weekNumber}
                            seasonNumber={lineup?.seasonNumber}
                            playingOnDate={lineup?.playingOnDate}
                        ></LineupMetaData>
                    </div>
                </PageHeader>

                {lineup?.isLineupLocked ? (
                    <div
                        style={{
                            marginBottom: '2rem'
                        }}
                    >
                        <h4>Lineup is locked</h4>
                        <p>Player subs can still be updated</p>
                    </div>
                ) : (
                    lineup && (
                        <Button
                            style={{
                                marginBottom: '2rem'
                            }}
                            size={
                                smallBelow
                                    ? ButtonSize.Block
                                    : ButtonSize.Medium
                            }
                            isDisabled={
                                !hasChanges ||
                                isInvalidLineup ||
                                lineup.isLineupLocked
                            }
                            isSubmitting={isSubmitting}
                            isSubmittingText="Saving..."
                            clickHandler={async () => {
                                if (
                                    lineup.courts.some(
                                        (court) => court.players.length > 4
                                    )
                                ) {
                                    toast.error(
                                        "Can't save lineup with more than 4 people on a court"
                                    );
                                } else {
                                    await saveLineup();
                                }
                            }}
                        >
                            Save Changes
                        </Button>
                    )
                )}

                <DraggableLineup></DraggableLineup>
            </ManagerLayout>
        </ManagerLineupContext.Provider>
    );
}
