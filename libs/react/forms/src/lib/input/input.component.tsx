import { Label } from '@clemann-developments/react/components/ui-elements';
import { useField } from 'formik';
import { forwardRef, useEffect } from 'react';
import styles from './input.module.scss';

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
    autoFocus?: boolean;
    max?: number;
    min?: number;
    style?: React.CSSProperties;
};

export const Input = forwardRef(
    (
        {
            label,
            subLabel,
            errorMessage,
            hideErrorMessage,
            style,
            ...props
        }: InputProps,
        ref: React.Ref<HTMLInputElement>
    ) => {
        const [field, meta] = useField(props);

        return (
            <div
                style={style || {}}
                className={`
                ${styles.inputWrapper}
                ${hideErrorMessage ? styles.hideErrorMessage : ''}
                ${
                    (meta.touched && meta.error) || errorMessage
                        ? styles.error
                        : ''
                }
            `}
            >
                {label && (
                    <Label
                        label={label}
                        subLabel={subLabel}
                        id={props.id || props.name}
                    ></Label>
                )}
                <input
                    ref={ref}
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
);
