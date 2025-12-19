'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRegisterMutation } from '../../redux/slices/auth/authApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const schema = yup.object({
    name: yup.string().required('Name is required').min(3, 'At least 3 characters'),
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'At least 8 characters'),
});

const RegisterForm = () => {
    const [registerUser, { isLoading }] = useRegisterMutation();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                name: data.name,
                email: data.email,
                password: data.password,
            };

            const res = await registerUser(payload).unwrap();

            toast.success(
                res?.message || 'Registered. Verification code sent to your email.',
            );

            // ✅ Redirect to verify page with email in query
            router.push(`/auth/verify?email=${encodeURIComponent(data.email)}`);

            reset({ name: '', email: '', password: '' });
        } catch (error) {
            console.error('Register error (raw):', error);

            const msg =
                error?.data?.message ||
                (Array.isArray(error?.data?.message)
                    ? error.data.message.join(', ')
                    : null) ||
                error?.error ||
                error?.message ||
                'Registration failed. Please try again.';

            toast.error(msg);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow p-6 rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Create account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"
                        {...register('name')}
                        placeholder="Your full name"
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"
                        {...register('email')}
                        placeholder="you@example.com"
                        type="email"
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
                        {...register('password')}
                        placeholder="********"
                        type="password"
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
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
