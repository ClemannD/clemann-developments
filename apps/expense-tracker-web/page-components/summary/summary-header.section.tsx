import { useContext, useEffect, useState } from 'react';
import ChartCard from '../../components/charts/chart-card/chart-card.component';
import YearSpendChart from '../../components/charts/year-spend-chart/year-spend-chart.component';
import SummaryHeader, {
    SummaryHeaderDataPoint
} from '../../components/ui-elements/summary-header/summary-header.component';
import { SummaryPageContext } from './summary-page.context';
import styles from './summary.module.scss';

export default function SummaryHeaderSection() {
    const [summaryHeaderDataPoints, setSummaryHeaderDataPoints] = useState<
        SummaryHeaderDataPoint[]
    >([]);

    const { yearSummary, isThisYear } = useContext(SummaryPageContext);

    const getDayOfYear = () =>
        new Date().getDate() + new Date().getMonth() * 30 + 1;
    const getDayOfMonth = () => new Date().getDate();

    useEffect(() => {
        if (yearSummary) {
            const dataPoints: SummaryHeaderDataPoint[] = [
                {
                    label: 'Year to Date',
                    value: !!yearSummary.yearTotalCents
                        ? (yearSummary.yearTotalCents / 100).toLocaleString(
                              'en-US',
                              {
                                  style: 'currency',
                                  currency: 'USD'
                              }
                          )
                        : null,
                    subLabel: `${getDayOfYear()}/365 Days`,
                    isLarge: true
                },
                {
                    label: 'This Month',
                    value: !!yearSummary.yearTotalCents
                        ? (yearSummary.yearTotalCents / 100).toLocaleString(
                              'en-US',
                              {
                                  style: 'currency',
                                  currency: 'USD'
                              }
                          )
                        : null,
                    subLabel: `${getDayOfMonth()}/30 Days`
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
