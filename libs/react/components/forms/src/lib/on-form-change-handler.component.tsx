import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

export function OnFormChangeHandler({
    onChange
}: {
    onChange: (value: any) => void;
}) {
    const { values } = useFormikContext();
    const [previousFilters, setPreviousFilters] = useState<any>({});

    useEffect(() => {
        if (values !== previousFilters) {
            setPreviousFilters(values);
            onChange(values);
        }
    }, [values]);

    return null;
}
