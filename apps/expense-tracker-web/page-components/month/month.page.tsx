import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MonthPage() {
    const router = useRouter();

    useEffect(() => {
        console.log('router.query', router.query);
    }, [router.query]);

    return <div>MonthPage</div>;
}
