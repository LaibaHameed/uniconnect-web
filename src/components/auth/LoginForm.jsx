'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation } from '../../redux/slices/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/auth/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const schema = yup.object({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required'),
});

const LoginForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                email: data.email,
                password: data.password,
            };

            const res = await login(payload).unwrap();

            // ✅ correct mapping from backend response
            dispatch(
                setCredentials({
                    accessToken: res.accessToken,
                    profileCompleted: res.profileCompleted,
                    user: res.user,
                })
            );

            toast.success("Logged in successfully.");

            if (res.profileCompleted) {
                router.push("/dashboard");
            } else {
                router.push("/complete-profile");
            }

        } catch (error) {
            console.error('Login error (raw):', error);

            const msg =
                error?.data?.message ||
                (Array.isArray(error?.data?.message)
                    ? error.data.message.join(', ')
                    : null) ||
                error?.error ||
                error?.message ||
                'Login failed. Please try again.';

            toast.error(msg);

            // If email not verified, redirect to verify page with email
            if (msg === 'Email not verified') {
                router.push(`/auth/verify?email=${encodeURIComponent(data.email)}`);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow p-6 rounded-lg mt-8">
            <h1 className="text-2xl font-semibold mb-4">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"
                        type="email"
                        placeholder="you@example.com"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"
                        type="password"
                        placeholder="********"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {/* Forgot password link */}
            <div className="mt-4 text-right">
                <button
                    type="button"
                    onClick={() => router.push('/auth/forgot-password')}
                    className="text-xs text-blue-600 hover:underline"
                >
                    Forgot your password?
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
