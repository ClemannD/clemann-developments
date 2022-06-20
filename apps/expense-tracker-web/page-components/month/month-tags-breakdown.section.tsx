import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useContext } from 'react';
import { MonthPageContext } from './month-page.context';
import styles from './month.module.scss';

export default function MonthTagsBreakdownSection() {
    const { monthSummary } = useContext(MonthPageContext);

    return (
        <div className={`${styles.monthBreakdown} card`}>
            <h3>Tags</h3>

            <div className={styles.breakdownHeader}>
                <div className="tableLabel">Tag</div>
                <div className="tableLabel">This Month</div>
            </div>

            {!!monthSummary &&
                monthSummary.tagSummaries.map((tagSummary) => (
                    <div
                        className={`${styles.breakdownItem} ${styles.breakdownItemCompact}`}
                        key={tagSummary.tagId}
                    >
                        <div className={styles.breakdownRow}>
                            <Pill color={PillColor.Black} lightFont>
                                {tagSummary.name}
                            </Pill>
                            <div className={styles.amount}>
                                {(tagSummary.totalCents / 100).toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD'
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
