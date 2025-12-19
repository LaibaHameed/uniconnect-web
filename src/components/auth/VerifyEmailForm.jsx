'use client';

import React, { useState } from 'react';
import {
    useVerifyEmailMutation,
    useResendVerificationMutation,
} from '../../redux/slices/auth/authApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const VerifyEmailForm = ({ initialEmail }) => {
    const [email, setEmail] = useState(initialEmail || '');
    const [code, setCode] = useState('');
    const [fieldError, setFieldError] = useState(null);

    const [verifyEmail, { isLoading: isVerifyLoading }] = useVerifyEmailMutation();
    const [resendVerification, { isLoading: isResendLoading }] =
        useResendVerificationMutation();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setFieldError(null);

            if (!email.trim()) {
                setFieldError('Email is required.');
                return;
            }

            if (!code.trim()) {
                setFieldError('Verification code is required.');
                return;
            }

            const payload = {
                email: email.trim(),
                code: code.trim(),
            };

            const res = await verifyEmail(payload).unwrap();

            toast.success(res?.message || 'Email verified successfully.');

            // After verify, user logs in manually
            router.push('/auth/login');
        } catch (error) {
            console.error('Verify error (raw):', error);

            const msg =
                error?.data?.message ||
                (Array.isArray(error?.data?.message)
                    ? error.data.message.join(', ')
                    : null) ||
                error?.error ||
                error?.message ||
                'Verification failed. Please try again.';

            setFieldError(msg);
            toast.error(msg);
        }
    };

    const handleResend = async () => {
        try {
            setFieldError(null);

            if (!email.trim()) {
                setFieldError('Email is required to resend the code.');
                return;
            }

            const res = await resendVerification({ email: email.trim() }).unwrap();

            toast.success(res?.message || 'New verification code sent to your email.');
        } catch (error) {
            console.error('Resend error (raw):', error);

            const msg =
                error?.data?.message ||
                (Array.isArray(error?.data?.message)
                    ? error.data.message.join(', ')
                    : null) ||
                error?.error ||
                error?.message ||
                'Failed to resend code. Please try again.';

            setFieldError(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow p-6 rounded-lg mt-8">
            <h1 className="text-2xl font-semibold mb-4">Verify your email</h1>
            <p className="text-sm text-gray-600 mb-4">
                Enter the email you used to register and the 6-digit code we sent you.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Verification code
                    </label>
                    <input
                        className="w-full border rounded px-3 py-2 text-sm tracking-widest text-center"
                        type="text"
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="123456"
                    />
                </div>

                {fieldError && (
                    <p className="text-xs text-red-500 mt-1">{fieldError}</p>
                )}

                <button
                    type="submit"
                    disabled={isVerifyLoading}
                    className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
                >
                    {isVerifyLoading ? 'Verifying...' : 'Verify email'}
                </button>
            </form>

            {/* ✅ Resend section */}
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-600 mb-2">
                    Didn&apos;t receive the code?
                </p>
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResendLoading}
                    className="text-sm text-blue-600 hover:underline disabled:opacity-60"
                >
                    {isResendLoading ? 'Resending...' : 'Resend verification code'}
                </button>
            </div>
        </div>
    );
};

export default VerifyEmailForm;
