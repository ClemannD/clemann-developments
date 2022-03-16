import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { useEffect, useRef, useState } from 'react';
import { ColorPicker, useColor, Color } from 'react-color-palette';
import styles from './color-chip.module.scss';

export function ColorChip({
    colorHex,
    style = {},
    onChange = () => {},
    onSelect = () => {},
    onClickOutside = () => {}
}: {
    colorHex: string;
    style?: React.CSSProperties;
    onChange?: (colorHex: string) => void;
    onSelect?: (colorHex: string) => void;
    onClickOutside?: (colorHex: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const colorPicker = useRef(null);
    const [color, setColor] = useColor('hex', colorHex);

    const onColorPicked = async (color: Color) => {
        setColor(color);
        await onChange(color.hex);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleClickOutside = async (e: { target: any }) => {
        if (colorPicker?.current?.contains(e.target)) {
            return;
        }
        setIsOpen(false);
        await onClickOutside(color.hex);
    };

    return (
        <div className={styles.colorChipWrapper} style={style}>
            <div
                className={styles.colorChip}
                style={{ backgroundColor: color.hex }}
                onClick={() => setIsOpen((prev) => !prev)}
            ></div>

            {isOpen && (
                <div className={styles.colorPickerDropdown} ref={colorPicker}>
                    <ColorPicker
                        height={200}
                        width={250}
                        hideRGB
                        hideHSV
                        color={color}
                        onChange={onColorPicked}
                    ></ColorPicker>
                    <div className={styles.colorPickerDropdownButton}>
                        <Button
                            appearance={ButtonAppearance.Secondary}
                            size={ButtonSize.Block}
                            clickHandler={async () => {
                                await onSelect(color.hex);
                                setIsOpen(false);
                            }}
                        >
                            Select
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
