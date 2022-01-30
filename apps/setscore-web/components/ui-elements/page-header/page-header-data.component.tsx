import { CalendarIcon } from '@heroicons/react/outline';
import { CSSProperties } from 'react';
import DateFormat from '../date/date.component';
import styles from './page-header-data.module.scss';

export type PageHeaderDataProps = {
    items: {
        label: string;
        data: string | number;
        icon?: string;
        placeholderWidth?: string;
    }[];
    justifyLeft?: boolean;
    compact?: boolean;
    style?: CSSProperties;
};

export default function PageHeaderData({
    items,
    style,
    justifyLeft = false,
    compact = false
}: PageHeaderDataProps) {
    const iconClasses = {
        calendar: CalendarIcon
    };

    return (
        <div
            className={`
                ${styles.pageHeaderData} 
                ${justifyLeft ? styles.justifyLeft : ''} 
                ${compact ? styles.compact : styles.notCompact}
            `}
            style={style || {}}
        >
            {items.map(({ label, data, icon, placeholderWidth = '2rem' }) => {
                const IconTag = icon && iconClasses[icon];

                return (
                    <div className={styles.pageHeaderDataItem} key={label}>
                        <div className={styles.data}>
                            {data || (
                                <div
                                    className={styles.placeholder}
                                    style={{
                                        width: placeholderWidth
                                    }}
                                ></div>
                            )}
                        </div>
                        <h6 className={styles.dataLabel}>
                            {IconTag && <IconTag></IconTag>}
                            {label}
                        </h6>
                    </div>
                );
            })}
        </div>
    );
}
