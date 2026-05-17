"use client";
import { MapPin, Pencil, Clock } from "lucide-react";


const formatEventDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

const EventCard = ({ event, isAdmin, groupId, router }) => (
    <div className="flex items-start justify-between gap-4 p-5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/60 transition-all duration-150 group">
        {/* Date accent */}
        <div className="shrink-0 w-12 text-center bg-blue-50 border border-blue-100 rounded-xl py-2 px-1">
            <p className="text-xs font-bold text-blue-600 uppercase leading-none">
                {new Date(event.startDateTime).toLocaleString(undefined, { month: "short" })}
            </p>
            <p className="text-xl font-black text-blue-700 leading-tight">
                {new Date(event.startDateTime).getDate()}
            </p>
        </div>

        <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm leading-snug truncate">
                {event.title}
            </h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {formatEventDate(event.startDateTime)}
                </span>
                {event.venue && (
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {event.venue}
                    </span>
                )}
            </div>
            {event.description && (
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 whitespace-pre-wrap">
                    {event.description}
                </p>
            )}
        </div>

        {isAdmin && (
            <button
                onClick={() => router.push(`/events/${event._id}/edit`)}
                className="shrink-0 p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
                title="Edit event"
            >
                <Pencil className="w-3.5 h-3.5" />
            </button>
        )}
    </div>
);

export default EventCard