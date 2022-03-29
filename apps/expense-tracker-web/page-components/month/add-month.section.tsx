import {
    Button,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { useContext, useState } from 'react';
import useCreateMonth from '../../api-services/month/createMonth.service';
import { MonthPageContext } from './month-page.context';
import styles from './month.module.scss';

export default function AddMonthSection() {
    const createMonthService = useCreateMonth();

    const { monthDto, fetchMonth } = useContext(MonthPageContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addMonth = async () => {
        setIsSubmitting(true);
        try {
            await createMonthService.mutateAsync({
                year: monthDto.year,
                month: monthDto.month
            });
            fetchMonth(monthDto.month, monthDto.year);
        } catch {}
        setIsSubmitting(false);
    };
    return (
        <div className={styles.addMonthSection}>
            <h3
                style={{
                    marginBottom: '2rem'
                }}
            >
                Create Month
            </h3>
            <div className={styles.addMonthBox}>
                <p
                    className="larger"
                    style={{
                        marginBottom: '1rem'
                    }}
                >
                    This month does not yet exits in the system. Create it to
                    start recording expenses for this month.
                </p>
                <p
                    style={{
                        marginBottom: '2rem'
                    }}
                >
                    Creating the month will add the current active recurring
                    expenses set in the configuration page.
                </p>

                <Button
                    size={ButtonSize.Block}
                    clickHandler={addMonth}
                    isSubmitting={isSubmitting}
                >
                    Add Month
                </Button>
            </div>
        </div>
    );
}
