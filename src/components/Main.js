"use client";

import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Main() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleGenerateClick = () => {
        if (session) {
            router.push('/Generate');
        } else {
            router.push('/auth/signin');
        }
    };

    return (
        <div>

        </div>
    );
}

export default Main;