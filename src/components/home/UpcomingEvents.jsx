'use client';

import { useRouter } from 'next/navigation';
import { Calendar, ArrowRight } from 'lucide-react';
import { useGetEventsQuery } from '@/redux/slices/events/eventsApi';

// Fetch the next 3 upcoming events — no filters needed from Redux
const PREVIEW_LIMIT = 3;

const EventRowSkeleton = () => (
  <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-emerald-100 animate-pulse">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  </div>
);

const UpcomingEvents = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetEventsQuery({
    upcoming: 'true',
    limit: PREVIEW_LIMIT,
    page: 1,
  });

  const events = data?.data || [];

  return (
    <section id="events" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 lg:mb-12 gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              Upcoming Events
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Don't miss these exciting opportunities
            </p>
          </div>
          <button
            onClick={() => router.push('/events')}
            className="px-4 cursor-pointer sm:px-6 py-2 sm:py-3 text-emerald-600 hover:text-emerald-700 font-semibold flex items-center space-x-2 group text-sm sm:text-base"
          >
            <span>See All Events</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Skeletons */}
        {isLoading && (
          <div className="space-y-3 sm:space-y-4">
            {Array.from({ length: PREVIEW_LIMIT }).map((_, i) => (
              <EventRowSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div className="text-center py-12 text-gray-500 text-sm">
            Could not load events. Please try again later.
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && events.length === 0 && (
          <div className="text-center py-12 border border-emerald-100 rounded-2xl text-gray-500 text-sm">
            No upcoming events right now. Check back soon!
          </div>
        )}

        {/* Event rows */}
        {!isLoading && !isError && events.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            {events.map((event) => (
              <div
                key={event._id}
                onClick={() => router.push(`/events/${event._id}`)}
                className="bg-linear-to-r from-white to-emerald-50 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition group cursor-pointer border border-emerald-100"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-linear-to-br from-emerald-600 to-blue-600 p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shrink-0">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition">
                        {event.title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600">
                        Organized by {event.groupId?.name ?? 'UAF Society'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {event.eventType && (
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm font-semibold">
                          {event.eventType}
                        </span>
                      )}
                      <span className="text-sm sm:text-base text-gray-700 font-semibold">
                        {new Date(event.startDateTime).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent row click
                        router.push(`/events/${event._id}`);
                      }}
                      className="w-full cursor-pointer sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold text-sm sm:text-base"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default UpcomingEvents;