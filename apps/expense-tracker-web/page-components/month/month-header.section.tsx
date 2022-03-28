import { MonthDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import SummaryHeader, {
    SummaryHeaderDataPoint
} from '../../components/ui-elements/summary-header/summary-header.component';
import { MonthPageContext } from './month-page.context';
import styles from './month.module.scss';

export default function MonthHeaderSection() {
    const router = useRouter();

    const { monthDto, monthSummary } = useContext(MonthPageContext);
    const [summaryHeaderDataPoints, setSummaryHeaderDataPoints] = useState<
        SummaryHeaderDataPoint[]
    >([]);

    useEffect(() => {
        if (monthDto) {
            const dataPoints: SummaryHeaderDataPoint[] = [
                {
                    label: 'This Month',
                    value: !!monthSummary
                        ? (
                              monthSummary?.thisMonthTotalCents / 100
                          ).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                          })
                        : null,
                    subLabel: getPrimaryHeaderSubLabel(monthDto),
                    isLarge: true
                }
            ];

            setSummaryHeaderDataPoints(dataPoints);
        }
    }, [monthSummary]);

    return (
        <div className={styles.monthHeaderSection}>
            <div className="header">
                <h2>
                    {!!monthDto.year &&
                        !!monthDto.month &&
                        new Intl.DateTimeFormat('en-US', {
                            month: 'long',
                            year: 'numeric'
                        }).format(new Date(monthDto.year, monthDto.month - 1))}
                </h2>
                <div className={styles.headerActions}>
                    <Button
                        appearance={ButtonAppearance.Secondary}
                        style={{
                            marginRight: '1rem'
                        }}
                        clickHandler={() => {
                            if (monthDto.month === 1) {
                                router.push(
                                    `/month/${monthDto.year - 1}/${12}`
                                );
                            } else {
                                router.push(
                                    `/month/${monthDto.year}/${
                                        monthDto.month - 1
                                    }`
                                );
                            }
                        }}
                    >
                        Last Month
                    </Button>

                    <Button
                        appearance={ButtonAppearance.Secondary}
                        style={{
                            marginRight: '1rem'
                        }}
                        clickHandler={() => {
                            router.push(
                                `/month/${new Date().getFullYear()}/${
                                    new Date().getMonth() + 1
                                }`
                            );
                        }}
                    >
                        Current Month
                    </Button>
                    <Button
                        appearance={ButtonAppearance.Secondary}
                        clickHandler={() => {
                            if (monthDto.month === 12) {
                                router.push(`/month/${monthDto.year + 1}/1`);
                            } else {
                                router.push(
                                    `/month/${monthDto.year}/${
                                        monthDto.month + 1
                                    }`
                                );
                            }
                        }}
                    >
                        Next Month
                    </Button>
                </div>
            </div>
            <SummaryHeader dataPoints={summaryHeaderDataPoints} />
        </div>
    );
}

const getPrimaryHeaderSubLabel = (monthDto: MonthDto) => {
    const daysLeftInMonth = getDaysLeftInMonth();

    const today = new Date();

    if (monthDto.month - 1 === today.getMonth()) {
        return `${daysLeftInMonth} days left`;
    } else {
    }
};

const getDaysLeftInMonth = () => {
    const date = new Date();
    return (
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() -
        date.getDate()
    );
};
