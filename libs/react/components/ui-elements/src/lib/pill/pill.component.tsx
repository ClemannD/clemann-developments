import styles from './pill.module.scss';

export enum PillColor {
    Black = 'Black',
    White = 'White',
    Green = 'Green',
    Yellow = 'Yellow',
    Blue = 'Blue',
    OffWhite = 'OffWhite',
    GrayLight = 'GrayLight',
    Transparent = 'Transparent'
}

export type PillProps = {
    children: any;
    color?: PillColor;
    colorHex?: string;
    lightFont?: boolean;
    blockSize?: boolean;
    style?: React.CSSProperties;
    small?: boolean;
    ref?: React.Ref<any>;
    clickHandler?: () => void;
};

export function Pill({
    children,
    color,
    colorHex,
    lightFont,
    blockSize,
    style,
    small,
    ref,
    clickHandler
}: PillProps) {
    let styleObject: React.CSSProperties = {};

    if (style) {
        styleObject = { ...styleObject, ...style };
    }

    if (colorHex) {
        styleObject.backgroundColor = colorHex;
    }

    return (
        <div
            ref={ref}
            className={`
                ${styles.pill}
                ${lightFont ? styles.lightFont : ''}
                ${blockSize ? styles.block : ''}
                ${clickHandler ? styles.clickable : ''}
                ${small ? styles.small : ''} ${styles[color || PillColor.White]}
            `}
            style={style}
            onClick={() => clickHandler && clickHandler()}
        >
            {children}
        </div>
    );
}
