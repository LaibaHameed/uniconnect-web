'use client';

import { apiSlice } from '../../apiSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),
        verifyEmail: builder.mutation({
            query: (body) => ({
                url: '/auth/verify-email',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth', 'Profile'],
        }),
        resendVerification: builder.mutation({
            query: (body) => ({
                url: '/auth/resend-verification',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),

        // ✅ Forgot password
        forgotPassword: builder.mutation({
            query: (body) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),

        // ✅ Reset password
        resetPassword: builder.mutation({
            query: (body) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {
    useRegisterMutation,
    useVerifyEmailMutation,
    useLoginMutation,
    useResendVerificationMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
