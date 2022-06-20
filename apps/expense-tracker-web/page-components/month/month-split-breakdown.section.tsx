import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useContext } from 'react';
import { MonthPageContext } from './month-page.context';
import styles from './month.module.scss';

export default function MonthSplitBreakdownSection() {
    const { monthSummary } = useContext(MonthPageContext);

    return (
        <div className={`${styles.monthBreakdown} card`}>
            <h3
                style={{
                    marginBottom: '2rem'
                }}
            >
                Split Summary
            </h3>

            <div
                className={`${styles.breakdownItem} ${styles.breakdownItemCompact}`}
            >
                <div className={styles.breakdownRow}>
                    <div className="tableLabel">Total Split Amount</div>
                    <div className={styles.amount}>
                        {monthSummary
                            ? (
                                  monthSummary.splitSummary
                                      .totalSplitAmountCents / 100
                              ).toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                              })
                            : '—'}
                    </div>
                </div>
            </div>
            <div
                className={`${styles.breakdownItem} ${styles.breakdownItemCompact}`}
            >
                <div className={styles.breakdownRow}>
                    <div className="tableLabel">Amount Paid</div>
                    <div className={styles.amount}>
                        {monthSummary
                            ? (
                                  monthSummary.splitSummary
                                      .totalPaidSplitAmountCents / 100
                              ).toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                              })
                            : '—'}
                    </div>
                </div>
            </div>
            <div
                className={`${styles.breakdownItem} ${styles.breakdownItemCompact}`}
            >
                <div className={styles.breakdownRow}>
                    <Pill color={PillColor.Black} lightFont>
                        Amount Owed
                    </Pill>
                    <div
                        className={styles.amount}
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        {monthSummary
                            ? (
                                  monthSummary.splitSummary
                                      .totalUnpaidSplitAmountCents / 100
                              ).toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                              })
                            : '—'}
                    </div>
                </div>
            </div>
        </div>
    );
}
