import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

export default function OnFormChangeHandler({ onChange }) {
    const { values } = useFormikContext();
    const [previousFilters, setPreviousFilters] = useState({});

    useEffect(() => {
        if (values !== previousFilters) {
            setPreviousFilters(values);
            onChange(values);
        }
    }, [values]);

    return null;
}
