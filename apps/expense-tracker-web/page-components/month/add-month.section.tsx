import {
    Button,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { useState } from 'react';
import useCreateMonth from '../../api-services/month/createMonth.service';
import styles from './month.module.scss';

export default function AddMonthSection({
    year,
    month,
    fetchMonth
}: {
    year: number;
    month: number;
    fetchMonth: (month: number, year: number) => void;
}) {
    const createMonth = useCreateMonth();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const addMonth = async () => {
        setIsSubmitting(true);
        try {
            await createMonth.mutateAsync({ year, month });
            fetchMonth(month, year);
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
