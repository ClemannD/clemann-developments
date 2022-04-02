import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useContext } from 'react';
import { MonthPageContext } from './month-page.context';
import styles from './month.module.scss';

export default function MonthCategoryBreakdownSection() {
    const { monthSummary } = useContext(MonthPageContext);

    return (
        <div className={styles.monthBreakdown}>
            <h3>Categories</h3>

            <div className={styles.breakdownHeader}>
                <div className="tableLabel">Category</div>
                <div className="tableLabel">This Month</div>
            </div>

            {!!monthSummary &&
                monthSummary.categorySummaries.map((categorySummary) => (
                    <div
                        className={styles.breakdownItem}
                        key={categorySummary.categoryId}
                    >
                        <div className={styles.breakdownRow}>
                            <Pill colorHex={categorySummary.color}>
                                {categorySummary.name}
                            </Pill>
                            <div className={styles.amount}>
                                {(
                                    categorySummary.totalCents / 100
                                ).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </div>
                        </div>
                        {categorySummary.subcategorySummaries.map(
                            (subcategorySummary) => (
                                <div
                                    className={`${styles.breakdownRow} ${styles.breakdownSubRow}`}
                                    key={subcategorySummary.subcategoryId}
                                >
                                    <Pill color={PillColor.GrayLight}>
                                        {subcategorySummary.name}
                                    </Pill>
                                    <div className={styles.amount}>
                                        {(
                                            subcategorySummary.totalCents / 100
                                        ).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        })}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ))}
        </div>
    );
}
