import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
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

    const { yearSummary, isThisYear, currentYear, setCurrentYear } =
        useContext(SummaryPageContext);

    const getDayOfYear = () =>
        new Date().getDate() + new Date().getMonth() * 30 + 1;

    useEffect(() => {
        const nonZeroMonths =
            yearSummary?.monthTotalsCents.filter(
                (monthTotal) => monthTotal > 0
            ) || [];

        const nonZeroMonthsTotal = nonZeroMonths.reduce(
            (acc, monthTotal) => acc + monthTotal,
            0
        );

        const highestMonth = nonZeroMonths.length
            ? nonZeroMonths.reduce(
                  (acc, monthTotal) => (monthTotal > acc ? monthTotal : acc),
                  0
              )
            : 0;

        const lowestMonth = nonZeroMonths.length
            ? nonZeroMonths.reduce(
                  (acc, monthTotal) => (monthTotal < acc ? monthTotal : acc),
                  Infinity
              )
            : 0;

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
                          nonZeroMonths.length
                              ? nonZeroMonthsTotal / nonZeroMonths.length
                              : 0
                      )
                    : null,
                subLabel: `Over ${nonZeroMonths.length} months`,
                hideOnMobile: true
            },
            {
                label: 'Highest Month',
                value: yearSummary ? centsToUsdString(highestMonth) : null,
                hideOnMobile: true
            },
            {
                label: 'Lowest Month',
                value: yearSummary ? centsToUsdString(lowestMonth) : null,
                hideOnMobile: true
            }
        ];

        setSummaryHeaderDataPoints(dataPoints);
    }, [yearSummary]);
    return (
        <>
            <div className={`header ${styles.summaryHeader}`}>
                <div className={styles.intro}>
                    <h2>{currentYear} Spending Overview</h2>
                    <p className={`tag ${styles.introTag}`}>
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

                <div className={styles.headerActions}>
                    <Button
                        appearance={ButtonAppearance.Secondary}
                        style={{
                            marginRight: '1rem'
                        }}
                        clickHandler={() => {
                            setCurrentYear(currentYear - 1);
                        }}
                    >
                        <ChevronLeftIcon></ChevronLeftIcon>
                    </Button>

                    <Button
                        appearance={ButtonAppearance.Secondary}
                        style={{
                            marginRight: '1rem'
                        }}
                        clickHandler={() => {
                            setCurrentYear(new Date().getFullYear());
                        }}
                    >
                        Current Year
                    </Button>
                    <Button
                        appearance={ButtonAppearance.Secondary}
                        clickHandler={() => {
                            setCurrentYear(currentYear + 1);
                        }}
                    >
                        <ChevronRightIcon></ChevronRightIcon>
                    </Button>
                </div>
            </div>

            <SummaryHeader dataPoints={summaryHeaderDataPoints} />

            <div className={styles.yearTotalsSection}>
                <ChartCard
                    chartTitle="Monthly Totals"
                    totalTitle={isThisYear ? 'YTD' : 'Total'}
                    isThisYear={isThisYear}
                    totalCents={
                        yearSummary ? yearSummary.yearTotalCents ?? 0 : null
                    }
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
