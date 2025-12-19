'use client';

import React, { useState } from 'react';
import { useResetPasswordMutation } from '../../redux/slices/auth/authApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ResetPasswordForm = ({ initialEmail }) => {
    const [email, setEmail] = useState(initialEmail || '');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fieldError, setFieldError] = useState(null);

    const [resetPassword, { isLoading }] = useResetPasswordMutation();
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
                setFieldError('Reset code is required.');
                return;
            }

            if (!newPassword.trim()) {
                setFieldError('New password is required.');
                return;
            }

            if (newPassword.length < 8) {
                setFieldError('Password must be at least 8 characters.');
                return;
            }

            if (newPassword !== confirmPassword) {
                setFieldError('Passwords do not match.');
                return;
            }

            const payload = {
                email: email.trim(),
                code: code.trim(),
                newPassword: newPassword.trim(),
            };

            const res = await resetPassword(payload).unwrap();

            toast.success(res?.message || 'Password reset successfully.');

            // After reset, go to login
            router.push('/auth/login');
        } catch (error) {
            console.error('Reset password error (raw):', error);

            const msg =
                error?.data?.message ||
                (Array.isArray(error?.data?.message)
                    ? error.data.message.join(', ')
                    : null) ||
                error?.error ||
                error?.message ||
                'Failed to reset password. Please try again.';

            setFieldError(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow p-6 rounded-lg mt-8">
            <h1 className="text-2xl font-semibold mb-4">Reset password</h1>
            <p className="text-sm text-gray-600 mb-4">
                Enter your email, the reset code you received, and your new password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Reset code</label>
                    <input
                        className="w-full border rounded px-3 py-2 text-sm tracking-widest text-center"
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">New password</label>
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"
                        type="password"
                        placeholder="********"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Confirm new password
                    </label>
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"
                        type="password"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {fieldError && (
                    <p className="text-xs text-red-500 mt-1">{fieldError}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
                >
                    {isLoading ? 'Resetting...' : 'Reset password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
