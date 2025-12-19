'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import VerifyEmailForm from '../../../components/auth/VerifyEmailForm';

const VerifyPage = () => {
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get('email') || '';

    return <VerifyEmailForm initialEmail={emailFromQuery} />;
};

export default VerifyPage;
