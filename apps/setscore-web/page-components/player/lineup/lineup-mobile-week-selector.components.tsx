import {
    Button,
    ButtonSize,
    ButtonAppearance
} from '@clemann-developments/react/component/button';
import React, { useEffect, useState } from 'react';
import Label from '../../../components/ui-elements/label/label.component';

export default function LineupMobileWeekSelector({
    initialSeasonNumber,
    initialWeekNumber,
    weekCountsBySeason,
    onSubmit
}: {
    initialSeasonNumber: number;
    initialWeekNumber: number;
    weekCountsBySeason: { [seasonNumber: number]: number };

    onSubmit: (seasonNumber: number, weekNumber: number) => Promise<void>;
}) {
    const [seasonNumber, setSeasonNumber] = useState(initialSeasonNumber);
    const [weekNumber, setWeekNumber] = useState(initialWeekNumber);

    const [maxWeekNumber, setMaxWeekNumber] = useState(1);
    const [maxSeasonNumber, setMaxSeasonNumber] = useState(1);
    const [minSeasonNumber, setMinSeasonNumber] = useState(1);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (weekCountsBySeason) {
            setMaxSeasonNumber(
                Object.keys(weekCountsBySeason).reduce(
                    (maxSeasonNumber, seasonNumber) =>
                        parseInt(seasonNumber) > maxSeasonNumber
                            ? parseInt(seasonNumber)
                            : maxSeasonNumber,
                    0
                )
            );
            setMinSeasonNumber(
                Object.keys(weekCountsBySeason).reduce(
                    (minSeasonNumber, seasonNumber) =>
                        parseInt(seasonNumber) < minSeasonNumber
                            ? parseInt(seasonNumber)
                            : minSeasonNumber,
                    1000
                )
            );
        }
    }, [weekCountsBySeason]);

    useEffect(() => {
        if (weekCountsBySeason) {
            setMaxWeekNumber(weekCountsBySeason[seasonNumber]);
            setWeekNumber(weekCountsBySeason[seasonNumber]);
        }
    }, [seasonNumber, weekCountsBySeason]);

    return (
        <div
            style={{
                marginTop: '2rem'
            }}
        >
            <Label label="Season" subLabel="Pick a season to view"></Label>
            <div
                className="row"
                style={{
                    marginBottom: '1rem'
                }}
            >
                <div className="col-5">
                    <Button
                        size={ButtonSize.Block}
                        appearance={ButtonAppearance.Secondary}
                        isDisabled={seasonNumber === minSeasonNumber}
                        clickHandler={() => {
                            if (seasonNumber > minSeasonNumber) {
                                setSeasonNumber(seasonNumber - 1);
                            }
                        }}
                    >
                        Prev
                    </Button>
                </div>
                <div className="col-2">
                    <h2
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        {seasonNumber}
                    </h2>
                </div>
                <div className="col-5">
                    <Button
                        size={ButtonSize.Block}
                        appearance={ButtonAppearance.Secondary}
                        isDisabled={seasonNumber >= maxSeasonNumber}
                        clickHandler={() => {
                            if (seasonNumber < maxSeasonNumber) {
                                setSeasonNumber(seasonNumber + 1);
                            }
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>

            <Label label="Week" subLabel="Pick a week to view"></Label>
            <div
                className="row"
                style={{
                    marginBottom: '1.5rem'
                }}
            >
                <div className="col-5">
                    <Button
                        size={ButtonSize.Block}
                        appearance={ButtonAppearance.Secondary}
                        isDisabled={weekNumber === 1}
                        clickHandler={() => {
                            if (weekNumber > 1) {
                                setWeekNumber(weekNumber - 1);
                            }
                        }}
                    >
                        Prev
                    </Button>
                </div>
                <div className="col-2">
                    <h2
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        {weekNumber}
                    </h2>
                </div>
                <div className="col-5">
                    <Button
                        size={ButtonSize.Block}
                        appearance={ButtonAppearance.Secondary}
                        isDisabled={weekNumber >= maxWeekNumber}
                        clickHandler={() => {
                            if (weekNumber < maxWeekNumber) {
                                setWeekNumber(weekNumber + 1);
                            }
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <Button
                size={ButtonSize.Block}
                appearance={ButtonAppearance.Primary}
                isSubmitting={isLoading}
                clickHandler={async () => {
                    setIsLoading(true);
                    await onSubmit(seasonNumber, weekNumber);
                }}
            >
                Switch to Week
            </Button>
        </div>
    );
}
