'use client';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, selectEventPagination } from '@/redux/slices/events/eventsSlice';
import { EventCard } from './EventCard';
import { EventCardSkeleton } from './EventCardSkeleton';
import { PaginationControls } from './PaginationControls';

const SKELETON_COUNT = 6;

export const EventsList = ({ events = [], isLoading, totalPages = 1 }) => {
    const dispatch = useDispatch();
    const { page } = useSelector(selectEventPagination);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: SKELETON_COUNT }, (_, i) => (
                    <EventCardSkeleton key={i} />
                ))}
            </div>
        );
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

            {totalPages > 1 && (
                <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    onPrev={() => dispatch(setPage(page - 1))}
                    onNext={() => dispatch(setPage(page + 1))}
                />
            )}
        </div>
    );
};