import styles from './pill.module.scss';

export enum PillColor {
    Black = 'Black',
    White = 'White',
    Green = 'Green',
    Yellow = 'Yellow',
    Blue = 'Blue',
    OffWhite = 'OffWhite'
}

export type PillProps = {
    children: any;
    color: PillColor;
    lightFont?: boolean;
    blockSize?: boolean;
    style?: React.CSSProperties;
    small?: boolean;
};

export default function Pill({
    children,
    color,
    lightFont,
    blockSize,
    style,
    small
}: PillProps) {
    return (
        <div
            className={`
                ${styles.pill} 
                ${lightFont ? styles.lightFont : ''} 
                ${blockSize ? styles.block : ''} 
                ${small ? styles.small : ''} ${styles[color]}
            `}
            style={style || {}}
        >
            {children}
        </div>
    );
}
