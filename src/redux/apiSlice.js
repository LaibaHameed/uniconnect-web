'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
        prepareHeaders: (headers, { getState }) => {
            try {
                const token = getState()?.auth?.token;
                if (token) {
                    headers.set('authorization', `Bearer ${token}`);
                }
                headers.set('Content-Type', 'application/json');
            } catch (error) {
                console.error('Error in prepareHeaders:', error);
            }
            return headers;
        },
    }),
    tagTypes: ['Auth', 'Profile'],
    endpoints: () => ({}),
});
