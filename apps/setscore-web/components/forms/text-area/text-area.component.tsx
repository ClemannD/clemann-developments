import { useField } from 'formik';
import Label from '../../ui-elements/label/label.component';
import styles from './text-area.module.scss';

export type InputProps = {
    label?: string;
    subLabel?: string;
    id?: string;
    name: string;
    type?: string;
    disabled?: boolean;
    placeholder?: string;
    autoComplete?: string;
    errorMessage?: string;
    hideErrorMessage?: boolean;
    maxlength?: number;
    min?: number;
    style?: React.CSSProperties;
};

export default function TextArea({
    label,
    subLabel,
    errorMessage,
    hideErrorMessage,
    style,
    ...props
}: InputProps) {
    const [field, meta] = useField(props);

    return (
        <div
            style={style || {}}
            className={`
                ${styles.inputWrapper} 
                ${
                    (meta.touched && meta.error) || errorMessage
                        ? styles.error
                        : ''
                }
            `}
        >
            <Label
                label={label}
                subLabel={subLabel}
                id={props.id || props.name}
            ></Label>
            <textarea
                className={`
                    ${styles.input} 
                    ${
                        (meta.touched && meta.error) || errorMessage
                            ? styles.error
                            : ''
                    }
                `}
                {...field}
                {...props}
            />
            {!hideErrorMessage &&
            ((meta.touched && meta.error) || errorMessage) ? (
                <div className={styles.errorMessage}>
                    {meta.error || errorMessage}
                </div>
            ) : null}
        </div>
    );
}
