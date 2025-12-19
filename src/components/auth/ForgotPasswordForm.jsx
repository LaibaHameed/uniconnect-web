'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForgotPasswordMutation } from '../../redux/slices/auth/authApi';
import { toast } from 'react-toastify';

const ForgotPasswordForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState(null);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setFieldError(null);

      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        setFieldError('Email is required.');
        return;
      }

      const res = await forgotPassword({ email: trimmedEmail }).unwrap();

      toast.success(
        res?.message ||
          'If an account exists for this email, a password reset code has been sent.',
      );

      // ✅ Redirect to reset password screen + prefill email
      router.push(`/auth/reset-password?email=${encodeURIComponent(trimmedEmail)}`);
    } catch (error) {
      console.error('Forgot password error (raw):', error);

      const msg =
        (Array.isArray(error?.data?.message)
          ? error.data.message.join(', ')
          : error?.data?.message) ||
        error?.error ||
        error?.message ||
        'Something went wrong. Please try again.';

      setFieldError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-lg mt-8">
      <h1 className="text-2xl font-semibold mb-4">Forgot password</h1>
      <p className="text-sm text-gray-600 mb-4">
        Enter your email address and we&apos;ll send you a code to reset your password.
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

        {fieldError ? <p className="text-xs text-red-500 mt-1">{fieldError}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
        >
          {isLoading ? 'Sending code...' : 'Send reset code'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
