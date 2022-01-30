import { ChevronDownIcon } from '@heroicons/react/outline';
import { useField } from 'formik';
import Label from '../../ui-elements/label/label.component';
import styles from './select.module.scss';

export type SelectProps = {
    label?: string;
    subLabel?: string;
    id?: string;
    name: string;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
    children?: any;
};

export default function Select({ label, subLabel, ...props }: SelectProps) {
    const [field, meta] = useField(props);

    return (
        <div
            className={`
            ${styles.selectWrapper} 
            ${meta.touched && meta.error ? styles.error : ''}
        `}
        >
            <Label
                label={label}
                subLabel={subLabel}
                id={props.id || props.name}
            ></Label>
            <div className={styles.selectBox}>
                <select
                    className={`
                ${styles.select} 
                ${meta.touched && meta.error ? styles.error : ''}
                `}
                    {...field}
                    {...props}
                />

                <ChevronDownIcon
                    className={styles.chevron}
                    height="2rem"
                ></ChevronDownIcon>
            </div>
            {meta.touched && meta.error ? (
                <div className={styles.errorMessage}>{meta.error}</div>
            ) : null}
        </div>
    );
}
