"use client";

import { apiSlice } from "@/redux/apiSlice";

export const profilesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: "/profiles/me",
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),

        setupProfile: builder.mutation({
            query: (body) => ({
                url: "/profiles/setup",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Profile", "Auth"],
        }),

        updateMyProfile: builder.mutation({
            query: (body) => ({
                url: "/profiles/me",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const {
    useGetMyProfileQuery,
    useSetupProfileMutation,
    useUpdateMyProfileMutation,
} = profilesApi;
