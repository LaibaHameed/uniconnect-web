'use client';
import { EventCard } from './EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, selectEventPagination } from '@/redux/slices/events/eventsSlice';

export const EventsList = ({ events = [], isLoading, totalPages = 1 }) => {
    const dispatch = useDispatch();
    const { page } = useSelector(selectEventPagination);

    if (isLoading) {
        return <div className="text-center py-20 text-zinc-500 font-medium animate-pulse">Loading events...</div>;
    }

    if (!events.length) {
        return (
            <div className="text-center py-20 bg-white border border-zinc-200 rounded-2xl">
                <p className="text-zinc-500 font-medium">No events found matching your criteria.</p>
                <p className="text-sm text-zinc-400 mt-1">Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-6 border-t border-zinc-200">
                    <button 
                        disabled={page <= 1}
                        onClick={() => dispatch(setPage(page - 1))}
                        className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-sm font-medium text-zinc-500">
                        Page {page} of {totalPages}
                    </span>
                    <button 
                        disabled={page >= totalPages}
                        onClick={() => dispatch(setPage(page + 1))}
                        className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};