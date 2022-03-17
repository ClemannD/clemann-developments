import { MonthDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import styles from './month.module.scss';

export default function MonthCategoryBreakdownSection({
    monthDto
}: {
    monthDto: MonthDto;
}) {
    return <div className={styles.monthCategoryBreakdown}></div>;
}
