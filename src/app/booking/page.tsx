'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BookingPage = () => {
    const router = useRouter();

    useEffect(() => {
        window.open('https://www.hosteeva.com/properties/available/details/12926-hosteeva-oceanfront-sunny-condo-w-pool-in-atlantica-towers-condo?utm_source=paradise252', '_blank');
    }, [router]);

    return null;
};

export default BookingPage;