import { useField } from 'formik';
import styles from './checkbox.module.scss';

export type CheckboxProps = {
    label?: string;
    subLabel?: string;
    id?: string;
    name: string;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
    children?: string;
};
export default function Checkbox({
    label,
    subLabel,
    children,
    ...props
}: CheckboxProps) {
    const [field, meta, fieldHelpers] = useField({
        ...props,
        type: 'checkbox'
    });

    return (
        <div
            className={`
                ${styles.checkboxWrapper} 
                ${meta.touched && meta.error ? styles.error : ''}
            `}
            onClick={() => {
                fieldHelpers.setValue(!field.value);
            }}
        >
            <input
                type="checkbox"
                className={`
                    ${styles.checkbox} 
                    ${meta.touched && meta.error ? styles.error : ''}
                `}
                {...field}
                {...props}
            />
            <p>{label}</p>
            {meta.touched && meta.error ? (
                <div className={styles.errorMessage}>{meta.error}</div>
            ) : null}
        </div>
    );
}
