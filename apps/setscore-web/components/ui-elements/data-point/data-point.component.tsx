import styles from './data-point.module.scss';

export default function DataPoint({
    label,
    style,
    children
}: {
    label: string;
    style?: any;
    children?: any;
}) {
    return (
        <div style={style}>
            <div
                className="p larger"
                style={{
                    marginBottom: '0.5rem'
                }}
            >
                {label}
            </div>
            <div className="p">{children}</div>
        </div>
    );
}
