import { CSSProperties } from 'react';
import { StyleHTMLAttributes } from 'react';
import Label from '../../../components/ui-elements/label/label.component';

export type CheckboxListProps = {
    label?: string;
    subLabel?: string;
    style?: CSSProperties;
    children?: any;
};

export default function CheckboxList({
    label,
    subLabel,
    style,
    children
}: CheckboxListProps) {
    return (
        <div style={style}>
            <Label label={label} subLabel={subLabel}></Label>
            {children}
        </div>
    );
}
