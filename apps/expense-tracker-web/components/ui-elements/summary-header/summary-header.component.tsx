import { SkeletonLoader } from '@clemann-developments/react/components/ui-elements';
import styles from './summary-header.module.scss';

export interface SummaryHeaderDataPoint {
    label: string;
    value: number | string;
    subLabel?: string;
    isLarge?: boolean;
}

export default function SummaryHeader({
    dataPoints
}: {
    dataPoints: SummaryHeaderDataPoint[];
}) {
    return (
        <div className={styles.summaryHeader}>
            {dataPoints.map(({ label, value, subLabel, isLarge }, index) => (
                <div className={styles.dataPoint} key={index}>
                    <h4>{label}</h4>
                    {value !== null ? (
                        <div
                            className={`
                            ${styles.value}
                            ${isLarge ? styles.large : ''}
                            `}
                        >
                            {value}
                        </div>
                    ) : (
                        <SkeletonLoader
                            style={{
                                width: '20rem',
                                height: isLarge ? '2.4rem' : '2.2rem',
                                margin: isLarge ? '2rem 0' : '1.5rem 0'
                            }}
                        />
                    )}
                    {subLabel && <p className={styles.subLabel}>{subLabel}</p>}
                </div>
            ))}
        </div>
    );
}
