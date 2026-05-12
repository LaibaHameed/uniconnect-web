import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { EventStatusBadge } from './EventStatusBadge';

export const EventCard = ({ event }) => {
    // Format date gracefully
    const startDate = new Date(event.startDateTime);
    const dateFormatted = startDate.toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeFormatted = startDate.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });

    return (
        <Link href={`/events/${event._id}`} className="block group">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all h-full flex flex-col gap-4">
                
                {/* Header: Badges */}
                <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-600 uppercase tracking-widest">
                            {event.eventType?.replace('_', ' ')}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 uppercase tracking-widest">
                            {event.mode?.replace('_', ' ')}
                        </span>
                    </div>
                    <EventStatusBadge status={event.status} />
                </div>

                {/* Body: Title & Details */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {event.title}
                    </h3>
                    
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <Calendar size={16} className="text-zinc-400" />
                            <span>{dateFormatted}</span>
                            <span className="text-zinc-300">•</span>
                            <Clock size={16} className="text-zinc-400" />
                            <span>{timeFormatted}</span>
                        </div>
                        
                        {event.mode !== 'ONLINE' && event.venue && (
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <MapPin size={16} className="text-zinc-400 shrink-0" />
                                <span className="truncate">{event.venue}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer: Group Info & Action */}
                <div className="pt-4 mt-2 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-600">
                        {event.group?.name || 'UAF Society'}
                    </span>
                    <ArrowRight size={18} className="text-zinc-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </Link>
    );
};