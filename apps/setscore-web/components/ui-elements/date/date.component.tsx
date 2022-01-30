import { useEffect, useState } from 'react';

export default function DateFormat({ date }: { date: Date }) {
    const [value, setValue] = useState<Date>(null);

    useEffect(() => {
        setValue(new Date(date));
    }, [date]);

    return <>{value?.toLocaleDateString()}</>;
}
