import styles from './data-box.module.scss';

export default function DataBox({
    style,
    children
}: {
    style?: any;
    paddingOverride?: string;
    children: any;
}) {
    return (
        <div style={style} className={styles.dataBox}>
            {children}
        </div>
    );
}
