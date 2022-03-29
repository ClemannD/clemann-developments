import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useContext } from 'react';
import { MonthPageContext } from './month-page.context';
import styles from './month.module.scss';

export default function MonthPaymentMethodsBreakdownSection() {
    const { monthSummary } = useContext(MonthPageContext);

    return (
        <div className={styles.monthBreakdown}>
            <h3>Payment Methods</h3>

            <div className={styles.breakdownHeader}>
                <div className="tableLabel">Payment Method</div>
                <div className="tableLabel">This Month</div>
            </div>

            {!!monthSummary &&
                monthSummary.paymentMethodSummaries.map(
                    (paymentMethodSummary) => (
                        <div
                            className={`${styles.breakdownItem} ${styles.breakdownItemCompact}`}
                            key={paymentMethodSummary.paymentMethodId}
                        >
                            <div className={styles.breakdownRow}>
                                <Pill color={PillColor.GrayLight}>
                                    {paymentMethodSummary.name}
                                </Pill>
                                <div className={styles.amount}>
                                    {(
                                        paymentMethodSummary.totalCents / 100
                                    ).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                )}
        </div>
    );
}
