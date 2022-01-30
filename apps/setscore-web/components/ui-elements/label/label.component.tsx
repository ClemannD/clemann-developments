import styles from './label.module.scss';

export default function Label({
    id,
    label,
    subLabel,
    style
}: {
    id?: string;
    label: string;
    subLabel?: string;
    style?: any;
}) {
    return (
        <label className={styles.labelWrapper} htmlFor={id} style={style}>
            <p className={styles.label}>{label}</p>
            {subLabel && <p className={styles.subLabel}>{subLabel}</p>}
        </label>
    );
}
