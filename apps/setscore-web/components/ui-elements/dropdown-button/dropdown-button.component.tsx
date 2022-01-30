import { AdjustmentsIcon, XIcon } from '@heroicons/react/outline';
import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../../hooks/useWindowDimensions';
import Button, {
    ButtonAppearance,
    ButtonSize
} from '../../buttons/button.component';
import styles from './dropdown-button.module.scss';

export default function DropdownButton({
    dropdownButtonText,
    style,
    disabled = false,
    children
}: {
    dropdownButtonText: string;
    style?: any;
    disabled?: boolean;
    children: React.ReactNode;
}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdown = useRef(null);
    const { largeBelow } = useWindowSize();

    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleClickOutside = (e) => {
        if (dropdown?.current.contains(e.target)) {
            return;
        }
        setShowDropdown(false);
    };
    return (
        <div className={styles.dropdownButtonWrapper} style={style}>
            <div
                ref={dropdown}
                className={styles.dropdown}
                style={{ display: showDropdown ? 'flex' : 'none' }}
            >
                <div className={styles.dropdownContent}>{children}</div>
                <Button
                    style={{
                        marginLeft: 'auto'
                    }}
                    appearance={ButtonAppearance.Secondary}
                    size={largeBelow ? ButtonSize.Block : ButtonSize.Small}
                    clickHandler={() => setShowDropdown(false)}
                >
                    Close <XIcon style={{ marginLeft: '0.5rem' }} />
                </Button>
            </div>
            <Button
                className={styles.dropdownButton}
                appearance={ButtonAppearance.Secondary}
                size={largeBelow ? ButtonSize.Auto : ButtonSize.Small}
                clickHandler={() => setShowDropdown(true)}
                isDisabled={disabled}
            >
                {dropdownButtonText}
                <AdjustmentsIcon
                    style={{ marginLeft: largeBelow ? '0' : '0.5rem' }}
                />
            </Button>
        </div>
    );
}
