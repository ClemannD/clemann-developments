import { Loading } from '@clemann-developments/react/components/ui-elements';
import {
    BarController,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    GridSettingsX,
    GridSettingsY,
    TickSettings,
    TooltipBaseSettings
} from '../chart.constants';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    Tooltip
);

export default function YearSpendChart({
    monthTotalsCents,
    colorHex
}: {
    monthTotalsCents: number[] | null;
    colorHex: string;
}) {
    const centsToUsdString = (cents: number) =>
        (cents / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    const centsToKString = (cents: number) =>
        centsToUsdString(cents).replace('.00', '');
    // const centsToKString = (cents: number) =>
    //     centsToUsdString(cents)
    //         .replace('.00', '')
    //         .replace(',000', 'k')
    //         .replace(',500', '.5k');

    const data = {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        datasets: [
            {
                backgroundColor: colorHex,
                borderRadius: 2,
                data: monthTotalsCents
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            axis: 'yAxes'
        },
        layout: {
            padding: {
                left: -15
            }
        },
        plugins: {
            tooltip: {
                ...TooltipBaseSettings,

                callbacks: {
                    label: (context) => centsToUsdString(context.raw)
                }
            }
        },
        scales: {
            x: {
                grid: GridSettingsX,
                ticks: TickSettings
            },
            yAxes: {
                grid: GridSettingsY,
                ticks: {
                    ...TickSettings,
                    callback: centsToKString
                }
            }
        }
    };

    if (monthTotalsCents === null) {
        return <Loading></Loading>;
    }

    return <Bar data={data} options={options} />;
}
