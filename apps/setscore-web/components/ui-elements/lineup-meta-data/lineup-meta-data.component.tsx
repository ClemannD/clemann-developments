import { format } from 'date-fns';
import React from 'react';
import PageHeaderData from '../page-header/page-header-data.component';

export default function LineupMetaData({
    weekNumber,
    seasonNumber,
    playingOnDate,
    isCurrentWeek = false,
    justifyLeft = false,
    compact = false
}: {
    weekNumber?: number;
    seasonNumber?: number;
    playingOnDate?: Date;
    isCurrentWeek?: boolean;
    justifyLeft?: boolean;
    compact?: boolean;
}) {
    return (
        <PageHeaderData
            justifyLeft={justifyLeft}
            compact={compact}
            items={[
                {
                    label: 'Season',
                    placeholderWidth: '1.8rem',
                    data: seasonNumber
                },
                {
                    label: 'Week',
                    placeholderWidth: '1.8rem',
                    data: weekNumber
                },
                {
                    icon: 'calendar',
                    label: isCurrentWeek ? 'Playing On' : 'Played On',
                    placeholderWidth: '7rem',
                    data: playingOnDate
                        ? format(new Date(playingOnDate), 'LLL do')
                        : null
                }
            ]}
        />
    );
}
