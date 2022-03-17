import { MonthDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import styles from './month.module.scss';

export default function MonthTagsBreakdownSection({
    monthDto
}: {
    monthDto: MonthDto;
}) {
    return <div className={styles.monthTagsBreakdown}></div>;
}
