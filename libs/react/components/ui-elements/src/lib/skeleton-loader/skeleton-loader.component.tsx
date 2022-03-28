import styles from './skeleton-loader.module.scss';

export function SkeletonLoader({ style }: { style?: React.CSSProperties }) {
    return (
        <div
            style={style}
            className={styles.skeletonLoader}
            aria-busy="true"
            aria-label="Loading"
        ></div>
    );
}
