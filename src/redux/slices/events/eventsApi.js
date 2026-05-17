import { apiSlice } from "@/redux/apiSlice";

export const eventsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Public Listing (Filterable & Paginated)
        getEvents: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params) {
                    Object.entries(params).forEach(([key, value]) => {
                        if (
                            value !== undefined &&
                            value !== null &&
                            value !== '' &&
                            value !== false
                        ) {
                            queryParams.append(key, value);
                        }
                    });
                }
                return {
                    url: `/events?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: (result, error, arg) => [
                { type: "Events", id: "LIST" },
                { type: "Events", id: arg?.groupId },
            ]
        }),


        // 2. Single Event Detail
        getEventById: builder.query({
            query: (eventId) => ({
                url: `/events/${eventId}`,
                method: "GET",
            }),
            providesTags: (result, error, eventId) => [{ type: "Events", id: eventId }],
        }),

        // 3. Create Event (Admin Only - scoped to group)
        createEvent: builder.mutation({
            query: ({ groupId, body }) => ({
                url: `/groups/${groupId}/events`,
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Events", id: "LIST" },
                { type: "Events", id: arg.groupId },
            ],
        }),

        // 4. Update Event (Admin Only - Status/Details)
        updateEvent: builder.mutation({
            query: ({ eventId, body }) => ({
                url: `/events/${eventId}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { eventId }) => [
                { type: "Events", id: eventId },
                { type: "Events", id: "LIST" },
            ],
        }),

        // 5. Cancel Event (Admin Only)
        cancelEvent: builder.mutation({
            query: (eventId) => ({
                url: `/events/${eventId}/cancel`,
                method: "PATCH",
            }),
            invalidatesTags: (result, error, eventId) => [
                { type: "Events", id: eventId },
                { type: "Events", id: "LIST" },
            ],
        }),

        // 6. Soft Delete Event (Admin Only)
        deleteEvent: builder.mutation({
            query: (eventId) => ({
                url: `/events/${eventId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Events", id: "LIST" },
                { type: "Events", id: arg.groupId },
            ],
        }),
    }),
});

export const {
    useGetEventsQuery,
    useGetEventByIdQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useCancelEventMutation,
    useDeleteEventMutation,
} = eventsApi;