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
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
                        <p className="text-gray-600 text-sm">
                            Enter the 6-digit code we sent to your email address to complete verification
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:outline-none"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Verification Code Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Verification Code
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                </div>
                                <input
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:outline-none tracking-[0.5em] text-center font-semibold"
                                    type="text"
                                    maxLength={6}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="000000"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1.5">
                                Enter the 6-digit code from your email
                            </p>
                        </div>

                        {/* Error Message */}
                        {fieldError && (
                            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                                <svg className="w-5 h-5 text-red-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-red-600">{fieldError}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isVerifyLoading}
                            className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {isVerifyLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                'Verify Email'
                            )}
                        </button>
                    </form>

                    {/* Resend Section */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Didn't receive the code?
                                </span>
                            </div>
                        </div>
                        
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isResendLoading}
                            className="w-full mt-4 px-4 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
                        >
                            {isResendLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending new code...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Resend Verification Code
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Need help?{' '}
                            <a href="/support" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <p className="text-center text-xs text-gray-500 mt-4">
                    The verification code is valid for 15 minutes
                </p>
            </div>
        </div>
    );
};

export default VerifyEmailForm;