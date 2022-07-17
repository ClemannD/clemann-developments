import { SkeletonLoader } from '@clemann-developments/react/components/ui-elements';
import { ReactNode } from 'react';
import styles from './chart-card.module.scss';

export default function ChartCard({
    chartTitle,
    totalTitle,
    totalCents,
    height = '35rem',
    isThisYear = false,
    children
}: {
    chartTitle: string;
    totalTitle?: string;
    totalCents?: number | null;
    isThisYear?: boolean;
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
                        <div>
                            {totalCents !== null ? (
                                <div
                                    className={`${styles.totalAmount} tableLabel`}
                                >
                                    {(
                                        totalCents /
                                        100 /
                                        (isThisYear
                                            ? new Date().getMonth()
                                            : 12)
                                    ).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        currencyDisplay: 'symbol'
                                    })}
                                </div>
                            ) : (
                                <SkeletonLoader
                                    style={{
                                        width: '5rem',
                                        height: '1.4rem',
                                        margin: '0rem 0'
                                    }}
                                />
                            )}
                            <p className="body">AVG</p>
                        </div>
                        <div
                            style={{
                                marginLeft: '3rem'
                            }}
                        >
                            {totalCents !== null ? (
                                <div
                                    className={`${styles.totalAmount} tableLabel`}
                                >
                                    {(totalCents / 100).toLocaleString(
                                        'en-US',
                                        {
                                            style: 'currency',
                                            currency: 'USD',
                                            currencyDisplay: 'symbol'
                                        }
                                    )}
                                </div>
                            ) : (
                                <SkeletonLoader
                                    style={{
                                        width: '5rem',
                                        height: '1.4rem',
                                        margin: '0rem 0'
                                    }}
                                />
                            )}
                            <p className="body">YTD</p>
                        </div>
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
