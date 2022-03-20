import { useEffect, useState } from 'react';
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
    id?: string;
    children: any;
    color?: PillColor;
    colorHex?: string;
    lightFont?: boolean;
    blockSize?: boolean;
    style?: React.CSSProperties;
    small?: boolean;
    className?: string;
    ref?: React.Ref<any>;
    tabindex?: number;
    clickHandler?: () => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
};

export function Pill({
    id,
    children,
    color,
    colorHex,
    lightFont,
    blockSize,
    style,
    small,
    className = '',
    ref,
    tabindex,
    clickHandler,
    onKeyDown,
    onBlur
}: PillProps) {
    const [forceLightFont, setForceLightFont] = useState(false);

    let styleObject: React.CSSProperties = {};

    if (style) {
        styleObject = { ...styleObject, ...style };
    }

    if (colorHex) {
        styleObject.backgroundColor = colorHex;
    }

    useEffect(() => {
        if (colorHex) {
            let red = parseInt(colorHex.substring(1, 3), 16);
            let green = parseInt(colorHex.substring(3, 5), 16);
            let blue = parseInt(colorHex.substring(5, 7), 16);
            let brightness = red * 0.299 + green * 0.587 + blue * 0.114;

            if (brightness <= 190) {
                setForceLightFont(true);
            }
        }
    }, [colorHex]);

    return (
        <div
            id={id}
            ref={ref}
            tabIndex={tabindex}
            className={`
                ${className}
                ${styles.pill}
                ${lightFont || forceLightFont ? styles.lightFont : ''}
                ${blockSize ? styles.block : ''}
                ${clickHandler ? styles.clickable : ''}
                ${small ? styles.small : ''} ${
                !colorHex ? styles[color || PillColor.White] : ''
            }
            `}
            style={styleObject}
            onClick={() => clickHandler && clickHandler()}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
        >
            {children}
        </div>
    );
}
