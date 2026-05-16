import { apiSlice } from "@/redux/apiSlice";

export const groupsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // =========================
        // PUBLIC
        // =========================

        getGroups: builder.query({
            query: ({ type, status, category } = {}) => {
                const params = new URLSearchParams();

                if (type) params.append("type", type);
                if (status) params.append("status", status);
                if (category) params.append("category", category);

                const qs = params.toString();

                return {
                    url: `/groups${qs ? `?${qs}` : ""}`,
                    method: "GET",
                };
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.map((group) => ({
                            type: "Groups",
                            id: group._id,
                        })),
                        { type: "Groups", id: "LIST" },
                    ]
                    : [{ type: "Groups", id: "LIST" }],
        }),

        getGroupById: builder.query({
            query: (groupId) => ({
                url: `/groups/${groupId}`,
                method: "GET",
            }),

            providesTags: (result, error, groupId) => [
                { type: "Groups", id: groupId },
            ],
        }),

        myGroups: builder.query({
            query: () => ({
                url: `/groups/me/list`,
                method: "GET",
            }),

            providesTags: [{ type: "Groups", id: "MY_GROUPS" }],
        }),

        // =========================
        // JOIN REQUESTS
        // =========================

        getMyJoinRequest: builder.query({
            query: ({ groupId }) => ({
                url: `/groups/${groupId}/join-request/me`,
                method: "GET",
            }),

            providesTags: (result, error, arg) => [
                { type: "MyJoinRequest", id: arg.groupId },
            ],
        }),

        createJoinRequest: builder.mutation({
            query: ({ groupId, note }) => ({
                url: `/groups/${groupId}/join-request`,
                method: "POST",
                body: {
                    note,
                },
            }),

            invalidatesTags: (result, error, arg) => [
                { type: "JoinRequests", id: arg.groupId },
                { type: "MyJoinRequest", id: arg.groupId },
                { type: "Members", id: arg.groupId },
                { type: "Groups", id: arg.groupId },
            ],
        }),

        cancelMyJoinRequest: builder.mutation({
            query: ({ groupId }) => ({
                url: `/groups/${groupId}/join-request/cancel`,
                method: "PATCH",
            }),

            invalidatesTags: (result, error, arg) => [
                { type: "JoinRequests", id: arg.groupId },
                { type: "MyJoinRequest", id: arg.groupId },
            ],
        }),

        listJoinRequests: builder.query({
            query: ({ groupId }) => ({
                url: `/groups/${groupId}/join-requests`,
                method: "GET",
            }),

            providesTags: (result, error, arg) => [
                { type: "JoinRequests", id: arg.groupId },
            ],
        }),

        decideJoinRequest: builder.mutation({
            query: ({ groupId, requestId, decision }) => ({
                url: `/groups/${groupId}/join-requests/${requestId}/decide`,
                method: "PATCH",
                body: {
                    decision, // APPROVED | REJECTED
                },
            }),

            invalidatesTags: (result, error, arg) => [
                { type: "JoinRequests", id: arg.groupId },
                { type: "Members", id: arg.groupId },
                { type: "Groups", id: arg.groupId },
            ],
        }),

        // =========================
        // GROUP CRUD
        // =========================

        createGroup: builder.mutation({
            query: (body) => ({
                url: `/groups`,
                method: "POST",
                body,
            }),

            invalidatesTags: [
                { type: "Groups", id: "LIST" },
                { type: "Groups", id: "MY_GROUPS" },
            ],
        }),

        updateGroup: builder.mutation({
            query: ({ groupId, body }) => ({
                url: `/groups/${groupId}`,
                method: "PATCH",
                body,
            }),

            invalidatesTags: (result, error, arg) => [
                { type: "Groups", id: arg.groupId },
                { type: "Groups", id: "LIST" },
                { type: "Groups", id: "MY_GROUPS" },
            ],
        }),

        deleteGroup: builder.mutation({
            query: (groupId) => ({
                url: `/groups/${groupId}`,
                method: "DELETE",
            }),

            invalidatesTags: [
                { type: "Groups", id: "LIST" },
                { type: "Groups", id: "MY_GROUPS" },
            ],
        }),

        // =========================
        // SUPER ADMIN
        // =========================

        decideGroupStatus: builder.mutation({
            query: ({ groupId, status }) => ({
                url: `/groups/${groupId}/status/${status}`,
                method: "PATCH",
            }),

            invalidatesTags: (result, error, arg) => [
                { type: "Groups", id: arg.groupId },
                { type: "Groups", id: "LIST" },
                { type: "Members", id: arg.groupId },
            ],
        }),

        // =========================
        // MEMBERS
        // =========================

        listMembers: builder.query({
            query: ({ groupId }) => ({
                url: `/groups/${groupId}/members`,
                method: "GET",
            }),
            transformResponse: (response) => {
                if (!Array.isArray(response)) return [];

                return response.map((member) => ({
                    ...member,
                    // Backend se ab direct fullName aur username aa raha hai
                    // Hum sirf fallback values handle karenge
                    fullName: member.fullName || "Unknown User",
                    username: member.username || "n/a",
                    profileImage: member.profileImage || "",
                    email: member.email || "",
                    user: member.userId || {},
                }));
            },
            providesTags: (result, error, arg) => [
                { type: "Members", id: arg.groupId },
            ],
        }),

        updateMemberRole: builder.mutation({
            query: ({ groupId, userId, role }) => ({
                url: `/groups/${groupId}/members/${userId}/role`,
                method: "PATCH",
                body: {
                    role,
                },
            }),

            invalidatesTags: (result, error, arg) => [
                { type: "Members", id: arg.groupId },
            ],
        }),

        removeMember: builder.mutation({
            query: ({ groupId, userId }) => ({
                url: `/groups/${groupId}/members/${userId}`,
                method: "DELETE",
            }),

            invalidatesTags: (result, error, arg) => [
                { type: "Members", id: arg.groupId },
                { type: "Groups", id: arg.groupId },
            ],
        }),
    }),
});

export const {
    // GROUPS
    useGetGroupsQuery,
    useGetGroupByIdQuery,
    useMyGroupsQuery,

    // GROUP CRUD
    useCreateGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,

    // SUPER ADMIN
    useDecideGroupStatusMutation,

    // JOIN REQUESTS
    useGetMyJoinRequestQuery,
    useCreateJoinRequestMutation,
    useCancelMyJoinRequestMutation,
    useListJoinRequestsQuery,
    useDecideJoinRequestMutation,

    // MEMBERS
    useListMembersQuery,
    useUpdateMemberRoleMutation,
    useRemoveMemberMutation,
} = groupsApi;