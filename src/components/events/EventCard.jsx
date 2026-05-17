import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { EventStatusBadge } from './EventStatusBadge';
import { formatEventDate, humanize } from '@/utils/event.utils';

export const EventCard = ({ event }) => {
    const { date, time } = formatEventDate(event.startDateTime);
    const showVenue = event.mode !== 'ONLINE' && event.venue;

    // Helper to determine the time-based status
    const getEventTimeStatus = () => {
        const now = new Date();
        const eventDate = new Date(event.startDateTime);
        
        // Reset hours for accurate "Today" comparison
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime();

        if (target < today) return { label: 'Past', classes: 'bg-red-200 text-red-600' };
        if (target === today) return { label: 'Today', classes: 'bg-orange-50 text-orange-700 border border-orange-100' };
        return { label: 'Upcoming', classes: 'bg-green-50 text-green-700 border border-green-100' };
    };

    const timeStatus = getEventTimeStatus();

    return (
        <Link href={`/events/${event._id}`} className="block group">
            <div className={`bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all h-full flex flex-col gap-4 ${timeStatus.label === 'Past' ? 'opacity-75' : ''}`}>

                {/* Badges */}
                <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-wrap gap-2">
                        {/* Dynamic Time Badge (Upcoming/Today/Past) */}
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${timeStatus.classes}`}>
                            {timeStatus.label}
                        </span>
                        
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-600 uppercase tracking-widest">
                            {humanize(event.eventType)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 uppercase tracking-widest">
                            {humanize(event.mode)}
                        </span>
                    </div>
                    {/* <EventStatusBadge status={event.status} /> */}
                </div>

                {/* Title & Meta */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {event.title}
                    </h3>

                    <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <Calendar size={16} className="text-zinc-400" />
                            <span>{date}</span>
                            <span className="text-zinc-300">•</span>
                            <Clock size={16} className="text-zinc-400" />
                            <span>{time}</span>
                        </div>

                        {showVenue && (
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <MapPin size={16} className="text-zinc-400 shrink-0" />
                                <span className="truncate">{event.venue}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-4 mt-2 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-600">
                        {event.groupId?.name ?? 'UAF Society'}
                    </span>
                    <ArrowRight size={18} className="text-zinc-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>

            </div>
        </Link>
    );
};