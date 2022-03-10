import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { useWindowSize } from '@clemann-developments/react/hooks/use-window-dimensions';
import { AdjustmentsIcon, XIcon } from '@heroicons/react/outline';
import React, { useEffect, useRef, useState } from 'react';
import styles from './dropdown-button.module.scss';

export function DropdownButton({
    dropdownButtonText,
    style,
    disabled = false,
    buttonAppearance = ButtonAppearance.Secondary,
    buttonSize,
    isOpen,
    IconClass = AdjustmentsIcon,
    setIsOpen,
    clickOutsideToClose = true,
    children
}: {
    dropdownButtonText: string;
    style?: any;
    disabled?: boolean;
    buttonAppearance?: ButtonAppearance;
    buttonSize?: ButtonSize;
    isOpen?: boolean;
    IconClass?: any;
    setIsOpen?: (isOpen: boolean) => void;
    clickOutsideToClose?: boolean;

    children: React.ReactNode;
}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdown = useRef(null);
    const { largeBelow } = useWindowSize();

    useEffect(() => {
        if (isOpen !== undefined) {
            setShowDropdown(isOpen);
        }
    }, [isOpen]);

    useEffect(() => {
        if (setIsOpen) {
            setIsOpen(showDropdown);
        }
    }, [showDropdown, setIsOpen]);

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleClickOutside = (e: { target: any }) => {
        if (dropdown?.current?.contains(e.target) || !clickOutsideToClose) {
            return;
        }
        setShowDropdown(false);
    };

    return (
        <div className={styles.dropdownButtonWrapper} style={style}>
            <div
                ref={dropdown}
                className={styles.dropdown}
                style={{ display: showDropdown ? 'block' : 'none' }}
            >
                <Button
                    style={{
                        marginLeft: 'auto'
                    }}
                    appearance={ButtonAppearance.Secondary}
                    size={
                        buttonSize
                            ? buttonSize
                            : largeBelow
                            ? ButtonSize.Block
                            : ButtonSize.Small
                    }
                    clickHandler={() => setShowDropdown(false)}
                >
                    Close <XIcon style={{ marginLeft: '0.5rem' }} />
                </Button>
                <div className={styles.dropdownContent}>{children}</div>
            </div>
            <Button
                className={styles.dropdownButton}
                appearance={buttonAppearance}
                size={
                    buttonSize
                        ? buttonSize
                        : largeBelow
                        ? ButtonSize.Auto
                        : ButtonSize.Small
                }
                clickHandler={() => setShowDropdown(true)}
                isDisabled={disabled}
            >
                {dropdownButtonText}
                <IconClass
                    style={{ marginLeft: largeBelow ? '0' : '0.5rem' }}
                />
            </Button>
        </div>
    );
}
