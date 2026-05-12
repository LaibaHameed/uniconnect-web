import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Client-side UI state
    filters: {
        search: '',
        status: '',
        mode: '',
        eventType: '',
        upcoming: false,
    },
    pagination: {
        page: 1,
        limit: 10,
    },
    selectedEventId: null, // Useful for modals or side-previews
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.pagination.page = 1; // Reset page on filter change
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
            state.pagination.page = 1;
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        setSelectedEvent: (state, action) => {
            state.selectedEventId = action.payload;
        },
    },
});

export const { 
    setFilters, 
    clearFilters, 
    setPage, 
    setSelectedEvent 
} = eventsSlice.actions;

// Selectors
export const selectEventFilters = (state) => state.events.filters;
export const selectEventPagination = (state) => state.events.pagination;

export default eventsSlice.reducer;