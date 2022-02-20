import { Label } from '@clemann-developments/react/components/ui-elements';
import { CSSProperties } from 'react';

export type CheckboxListProps = {
    label: string;
    subLabel?: string;
    style?: CSSProperties;
    children?: any;
};

export function CheckboxList({
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
