'use client';
import { useSelector } from 'react-redux';
import { useGetEventsQuery } from '@/redux/slices/events/eventsApi';
import { selectEventFilters, selectEventPagination } from '@/redux/slices/events/eventsSlice';
import { EventFilters } from '@/components/events/EventFilters';
import { EventsList } from '@/components/events/EventsList';

export default function EventsPage() {
    const filters = useSelector(selectEventFilters);
    const { page, limit } = useSelector(selectEventPagination);

    const { data, isLoading } = useGetEventsQuery({ ...filters, page, limit });

    return (
        <div className="min-h-screen bg-zinc-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">
                        Campus Events
                    </h1>
                    <p className="text-lg text-zinc-500">
                        Discover workshops, hackathons, and seminars happening at UAF.
                    </p>
                </div>

                <EventFilters />

                <EventsList
                    events={data?.data ?? []}
                    isLoading={isLoading}
                    totalPages={data?.meta?.totalPages ?? 1}
                />

            </div>
        </div>
    );
}