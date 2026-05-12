import { Calendar, MapPin, Clock, Video, Sparkles, ExternalLink, Tag } from 'lucide-react';
import { EventStatusBadge } from './EventStatusBadge';

export const EventDetail = ({ event }) => {
    const startDate = new Date(event.startDateTime);
    const endDate = new Date(event.endDateTime);
    
    const dateOpts = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const timeOpts = { hour: '2-digit', minute: '2-digit' };

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
            {/* Optional Banner Image */}
            {event.bannerUrl && (
                <div className="w-full h-64 md:h-80 bg-zinc-100 border-b border-zinc-200 relative">
                    <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />
                </div>
            )}

            <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <EventStatusBadge status={event.status} />
                    <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-bold uppercase tracking-wider rounded-full">
                        {event.eventType?.replace('_', ' ')}
                    </span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
                        {event.mode?.replace('_', ' ')}
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-6">
                    {event.title}
                </h1>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 border border-zinc-200 rounded-2xl p-6 mb-10">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white border border-zinc-200 rounded-xl text-blue-600 shadow-sm">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Date & Time</p>
                            <p className="text-sm font-semibold text-zinc-900">{startDate.toLocaleDateString('en-PK', dateOpts)}</p>
                            <p className="text-sm text-zinc-600 mt-0.5">
                                {startDate.toLocaleTimeString('en-PK', timeOpts)} - {endDate.toLocaleTimeString('en-PK', timeOpts)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white border border-zinc-200 rounded-xl text-blue-600 shadow-sm">
                            {event.mode === 'ONLINE' ? <Video size={24} /> : <MapPin size={24} />}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Location</p>
                            <p className="text-sm font-semibold text-zinc-900">{event.mode === 'ONLINE' ? 'Virtual Event' : event.venue}</p>
                        </div>
                    </div>
                </div>

                {/* AI Summary Section */}
                {event.aiSummary && (
                    <div className="mb-10 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 relative">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={20} className="text-blue-600" />
                            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest">AI Quick Summary</h3>
                        </div>
                        <p className="text-blue-800 leading-relaxed font-medium">{event.aiSummary}</p>
                    </div>
                )}

                {/* Main Content */}
                <div className="prose prose-zinc max-w-none mb-10">
                    <h3 className="text-xl font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-2">About This Event</h3>
                    <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-10">
                        <Tag size={18} className="text-zinc-400 mr-2" />
                        {event.tags.map(tag => (
                            <span key={tag} className="px-3 py-1.5 bg-zinc-100 border border-zinc-200 text-zinc-700 text-sm font-medium rounded-lg">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-zinc-500 font-medium">
                        Organized by <span className="text-zinc-900 font-bold">{event.group?.name || 'UAF Society'}</span>
                    </div>
                    {event.registrationLink && event.status === 'PUBLISHED' && (
                        <a 
                            href={event.registrationLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                        >
                            Register Now <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};