import { useContext, useEffect, useState } from 'react';
import ChartCard from '../../components/charts/chart-card/chart-card.component';
import YearSpendChart from '../../components/charts/year-spend-chart/year-spend-chart.component';
import SummaryHeader, {
    SummaryHeaderDataPoint
} from '../../components/ui-elements/summary-header/summary-header.component';
import { SummaryPageContext } from './summary-page.context';
import styles from './summary.module.scss';

export default function SummaryHeaderSection() {
    const centsToUsdString = (cents: number) =>
        (cents / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });

    const [summaryHeaderDataPoints, setSummaryHeaderDataPoints] = useState<
        SummaryHeaderDataPoint[]
    >([]);

    const { yearSummary, isThisYear } = useContext(SummaryPageContext);

    const getDayOfYear = () =>
        new Date().getDate() + new Date().getMonth() * 30 + 1;
    const getDayOfMonth = () => new Date().getDate();

    useEffect(() => {
        if (yearSummary) {
            const nonZeroMonths = yearSummary.monthTotalsCents.filter(
                (monthTotal) => monthTotal > 0
            );

            const nonZeroMonthsTotal = nonZeroMonths.reduce(
                (acc, monthTotal) => acc + monthTotal,
                0
            );

            const highestMonth = nonZeroMonths.reduce(
                (acc, monthTotal) => (monthTotal > acc ? monthTotal : acc),
                0
            );

            const lowestMonth = nonZeroMonths.reduce(
                (acc, monthTotal) => (monthTotal < acc ? monthTotal : acc),
                Infinity
            );

            const dataPoints: SummaryHeaderDataPoint[] = [
                {
                    label: 'Year to Date',
                    value: yearSummary
                        ? centsToUsdString(yearSummary.yearTotalCents)
                        : null,
                    subLabel: `${getDayOfYear()}/365 Days`,
                    isLarge: true
                },
                {
                    label: 'Monthly Average',
                    value: yearSummary
                        ? centsToUsdString(
                              nonZeroMonthsTotal / nonZeroMonths.length
                          )
                        : null,
                    subLabel: `Over ${nonZeroMonths.length} months`
                },
                {
                    label: 'Highest Month',
                    value: yearSummary ? centsToUsdString(highestMonth) : null
                },
                {
                    label: 'Lowest Month',
                    value: yearSummary ? centsToUsdString(lowestMonth) : null
                }
            ];

            setSummaryHeaderDataPoints(dataPoints);
        }
    }, [yearSummary]);
    return (
        <>
            <div className="header">
                <div>
                    <h2>2022 Spending Overview</h2>
                    <p className="tag">
                        Welcome back, Today is{' '}
                        <b>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </b>
                    </p>
                </div>

                <div className={styles.headerActions}></div>
            </div>

            <SummaryHeader dataPoints={summaryHeaderDataPoints} />

            <div className={styles.yearTotalsSection}>
                <ChartCard
                    chartTitle="Monthly Totals"
                    totalTitle={isThisYear ? 'YTD' : 'Total'}
                    totalCents={yearSummary?.yearTotalCents}
                >
                    <YearSpendChart
                        monthTotalsCents={yearSummary?.monthTotalsCents}
                        colorHex="#3C7DF6"
                    />
                </ChartCard>
            </div>
        </>
    );
}
