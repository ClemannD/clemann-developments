import styles from './card.module.scss';

export function Card(props: any) {
    return (
        <div
            className={`${styles.card} ${props.className}`}
            style={props.style}
        >
            {props.header && (
                <div className={styles.cardHeader}>{props.header}</div>
            )}
            <div>{props.children}</div>
        </div>
    );
}
