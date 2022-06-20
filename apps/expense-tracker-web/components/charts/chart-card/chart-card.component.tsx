import { SkeletonLoader } from '@clemann-developments/react/components/ui-elements';
import { ReactNode } from 'react';
import styles from './chart-card.module.scss';

export default function ChartCard({
    chartTitle,
    totalTitle,
    totalCents,
    height = '35rem',
    children
}: {
    chartTitle: string;
    totalTitle?: string;
    totalCents?: number | null;
    height?: string;
    children: ReactNode;
}) {
    return (
        <div className={`${styles.chartCard} card`}>
            <div className={styles.chartHeader}>
                <div>
                    <h4 className="cardTitle">{chartTitle}</h4>
                </div>
                {totalTitle && (
                    <div className={styles.chartHeaderRight}>
                        {totalCents !== null ? (
                            <div className={`${styles.totalAmount} tableLabel`}>
                                {(totalCents / 100).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    currencyDisplay: 'symbol'
                                })}
                            </div>
                        ) : (
                            <SkeletonLoader
                                style={{
                                    width: '5rem',
                                    height: '1.5rem',
                                    margin: '0.5rem 0'
                                }}
                            />
                        )}
                        <p className="body">YTD</p>
                    </div>
                )}
            </div>
            <div
                style={{
                    height
                }}
            >
                {children}
            </div>
        </div>
    );
}
