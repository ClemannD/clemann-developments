import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useNavigateToCurrentMonth() {
    const router = useRouter();

    useEffect(() => {
        router.push(
            `/month/${new Date().getFullYear()}/${new Date().getMonth() + 1}`
        );
    }, []);
}
