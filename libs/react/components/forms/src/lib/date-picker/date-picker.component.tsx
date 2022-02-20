import { Label } from '@clemann-developments/react/components/ui-elements';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { useField, useFormikContext } from 'formik';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import styles from './date-picker.module.scss';

export type DatePickerProps = {
    label: string;
    subLabel?: string;
    id?: string;
    name: string;
    type?: string;
    disabled?: boolean;
    placeholder?: string;
    autoComplete?: string;
    errorMessage?: string;
};

function parseDate(str: string, format: string, locale: any) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

function formatDate(date: number | Date, format: string, locale: any) {
    return dateFnsFormat(date, format, { locale });
}

export const DatePickerField = ({
    label,
    subLabel,
    errorMessage,
    ...props
}: DatePickerProps) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const FORMAT = 'MM/dd/yyyy';

    return (
        <div
            className={`
                ${styles.inputWrapper}
                ${meta.touched && meta.error ? styles.error : ''}
            `}
        >
            <Label
                label={label}
                subLabel={subLabel}
                id={props.id || props.name}
            ></Label>
            <DayPickerInput
                {...field}
                {...props}
                formatDate={formatDate}
                format={FORMAT}
                parseDate={parseDate}
                placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                value={(field.value && new Date(field.value)) || null}
                onDayChange={(val) => {
                    setFieldValue(field.name, val);
                }}
            />
            {meta.error}
            {meta.touched && meta.error ? (
                <div className={styles.errorMessage}>{meta.error}</div>
            ) : null}
        </div>
    );
};
