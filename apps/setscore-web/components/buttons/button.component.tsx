import { CSSProperties, MutableRefObject } from 'react';
import styles from './button.module.scss';

export enum ButtonAppearance {
    Primary = 'primary',
    Secondary = 'secondary',
    Jumbo = 'jumbo',
    JumboNumber = 'jumboNumber',
    Danger = 'danger',
    Transparent = 'transparent',
    TransparentWhite = 'transparentWhite',
    Link = 'link',
    Icon = 'icon'
}

export enum ButtonSize {
    Auto = 'auto',
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
    Block = 'block'
}

export type ButtonProps = {
    type?: 'button' | 'submit';
    clickHandler?: (event) => void;
    appearance?: ButtonAppearance;
    size?: ButtonSize;
    linkColor?: string;
    isDisabled?: boolean;
    isSubmitting?: boolean;
    isSubmittingText?: string;
    style?: CSSProperties;
    children?: any;
    ref?: MutableRefObject<any>;
    className?: string;
};

export default function Button({
    type = 'button',
    clickHandler = () => {},
    appearance = ButtonAppearance.Primary,
    size = ButtonSize.Auto,
    linkColor,
    isDisabled = false,
    isSubmitting = false,
    isSubmittingText,
    style = {},
    ref,
    className = '',
    children
}: ButtonProps) {
    return (
        <button
            ref={ref}
            type={type}
            style={style}
            className={`
            ${className}
                ${styles.button} 
                ${styles[appearance]} 
                ${styles[size]} 
                ${linkColor ? styles[linkColor] : ''} 
                ${isDisabled || isSubmitting ? styles.disabled : ''} 
            `}
            onClick={isDisabled || isSubmitting ? () => {} : clickHandler}
        >
            {isSubmitting ? (
                <span>{isSubmittingText || 'Loading...'}</span>
            ) : (
                children
            )}
        </button>
    );
}
