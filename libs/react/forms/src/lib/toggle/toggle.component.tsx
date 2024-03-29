import { CheckIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import styles from './toggle.module.scss';

export function Toggle({
    label,
    checked,
    onChange,
    disabled,
    style = {}
}: {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    style?: React.CSSProperties;
}) {
    const [isChecked, setIsChecked] = useState(checked);
    return (
        <div
            style={style}
            className={`${styles.toggle} ${disabled ? styles.disabled : ''}`}
            onClick={() => {
                if (!disabled) {
                    setIsChecked((previous) => !previous);
                    onChange(!isChecked);
                }
            }}
        >
            <div
                className={`${styles.toggleButton} ${
                    isChecked ? styles.isChecked : ''
                }`}
            >
                {isChecked && <CheckIcon height={12}></CheckIcon>}
            </div>
            {label && <div className={styles.toggleLabel}>{label}</div>}
        </div>
    );
}
