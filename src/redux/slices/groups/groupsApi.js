import { apiSlice } from "@/redux/apiSlice";

export const groupsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // PUBLIC
        getGroups: builder.query({
            query: ({ type, status, category } = {}) => {
                const params = new URLSearchParams();
                if (type) params.append("type", type);
                if (status) params.append("status", status);
                if (category) params.append("category", category);

                const qs = params.toString();
                return { url: `/groups${qs ? `?${qs}` : ""}`, method: "GET" };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((g) => ({ type: "Groups", id: g._id })),
                        { type: "Groups", id: "LIST" },
                    ]
                    : [{ type: "Groups", id: "LIST" }],
        }),

        getGroupById: builder.query({
            query: (groupId) => ({ url: `/groups/${groupId}`, method: "GET" }),
            providesTags: (result, error, groupId) => [{ type: "Groups", id: groupId }],
        }),

        // AUTH
        createGroup: builder.mutation({
            query: (body) => ({
                url: `/groups`,
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Groups", id: "LIST" }],
        }),

        updateGroup: builder.mutation({
            query: ({ groupId, body }) => ({
                url: `/groups/${groupId}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (res, err, arg) => [{ type: "Groups", id: arg.groupId }],
        }),

        deleteGroup: builder.mutation({
            query: (groupId) => ({ url: `/groups/${groupId}`, method: "DELETE" }),
            invalidatesTags: [{ type: "Groups", id: "LIST" }],
        }),

        // SUPER ADMIN
        decideGroupStatus: builder.mutation({
            query: ({ groupId, status }) => ({
                url: `/groups/${groupId}/status/${status}`, // APPROVED | REJECTED
                method: "PATCH",
            }),
            invalidatesTags: (res, err, arg) => [{ type: "Groups", id: arg.groupId }],
        }),

        // JOIN REQUESTS
        createJoinRequest: builder.mutation({
            query: ({ groupId, note }) => ({
                url: `/groups/${groupId}/join-request`,
                method: "POST",
                body: { note },
            }),
            invalidatesTags: (res, err, arg) => [{ type: "JoinRequests", id: arg.groupId }],
        }),

        cancelMyJoinRequest: builder.mutation({
            query: ({ groupId }) => ({
                url: `/groups/${groupId}/join-request/cancel`,
                method: "PATCH",
            }),
            invalidatesTags: (res, err, arg) => [{ type: "JoinRequests", id: arg.groupId }],
        }),

        listJoinRequests: builder.query({
            query: ({ groupId }) => ({
                url: `/groups/${groupId}/join-requests`,
                method: "GET",
            }),
            providesTags: (res, err, arg) => [{ type: "JoinRequests", id: arg.groupId }],
        }),

        decideJoinRequest: builder.mutation({
            query: ({ groupId, requestId, decision }) => ({
                url: `/groups/${groupId}/join-requests/${requestId}/decide`,
                method: "PATCH",
                body: { decision }, // APPROVED | REJECTED
            }),
            invalidatesTags: (res, err, arg) => [{ type: "JoinRequests", id: arg.groupId }],
        }),

        // MEMBERS
        listMembers: builder.query({
            query: ({ groupId }) => ({ url: `/groups/${groupId}/members`, method: "GET" }),
            providesTags: (res, err, arg) => [{ type: "Members", id: arg.groupId }],
        }),

        myGroups: builder.query({
            query: () => ({ url: `/groups/me/list`, method: "GET" }),
            providesTags: [{ type: "Groups", id: "MY" }],
        }),

        updateMemberRole: builder.mutation({
            query: ({ groupId, userId, role }) => ({
                url: `/groups/${groupId}/members/${userId}/role`,
                method: "PATCH",
                body: { role },
            }),
            invalidatesTags: (res, err, arg) => [{ type: "Members", id: arg.groupId }],
        }),

        removeMember: builder.mutation({
            query: ({ groupId, userId }) => ({
                url: `/groups/${groupId}/members/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: (res, err, arg) => [{ type: "Members", id: arg.groupId }],
        }),
    }),
});

export const {
    useGetGroupsQuery,
    useGetGroupByIdQuery,
    useCreateGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,
    useDecideGroupStatusMutation,
    useCreateJoinRequestMutation,
    useCancelMyJoinRequestMutation,
    useListJoinRequestsQuery,
    useDecideJoinRequestMutation,
    useListMembersQuery,
    useMyGroupsQuery,
    useUpdateMemberRoleMutation,
    useRemoveMemberMutation,
} = groupsApi;
