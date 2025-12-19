'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get('email') || '';

    return <ResetPasswordForm initialEmail={emailFromQuery} />;
};

export default ResetPasswordPage;
