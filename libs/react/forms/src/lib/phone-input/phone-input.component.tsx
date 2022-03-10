import { FormikProps, useField } from 'formik';
import React from 'react';
import styles from './phone-input.module.scss';
import PhoneInput from 'react-phone-number-input/input';
import { Label } from '@clemann-developments/react/components/ui-elements';

export type PhoneNumberInputProps = {
    label: string;
    subLabel?: string;
    id?: string;
    name: string;
    placeholder?: string;
    autoComplete?: string;
    formikProps: FormikProps<any>;
};

export function PhoneNumberInput({
    label,
    subLabel,
    formikProps,
    ...props
}: PhoneNumberInputProps) {
    const [field, meta] = useField(props);

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
            <PhoneInput
                country="US"
                className={`
                    ${styles.input}
                    ${meta.touched && meta.error ? styles.error : ''}
                `}
                {...field}
                {...props}
                value={field.value}
                onChange={(value) => {
                    formikProps.setFieldValue(props.name, value);
                }}
            />
            {meta.touched && meta.error ? (
                <div className={styles.errorMessage}>{meta.error}</div>
            ) : null}
        </div>
    );
}
