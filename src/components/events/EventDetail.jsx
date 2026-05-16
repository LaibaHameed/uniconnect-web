import {
    Calendar, MapPin, Clock, Video, Sparkles,
    ExternalLink, Tag, Users, Mail, Phone,
    Instagram, Link as LinkIcon, Info
} from 'lucide-react';
import { EventStatusBadge } from './EventStatusBadge';
import { humanize, formatEventDate } from '@/utils/event.utils';
import Link from 'next/link';

// ─── Small reusable pieces ────────────────────────────────────────────────────

const SectionHeading = ({ children }) => (
    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        {children}
    </h3>
);

const InfoTile = ({ icon: Icon, label, primary, secondary }) => (
    <div className="flex items-start gap-4">
        <div className="p-3 bg-white border border-gray-200 rounded-xl text-blue-600 shadow-sm shrink-0">
            <Icon size={22} />
        </div>
        <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm font-semibold text-gray-900">{primary}</p>
            {secondary && <p className="text-sm text-gray-600 mt-0.5">{secondary}</p>}
        </div>
    </div>
);

const ContactChip = ({ icon: Icon, href, label, color = 'gray' }) => {
    const colorMap = {
        gray: 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200',
        green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
        pink: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
        blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    };

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${colorMap[color]}`}
        >
            <Icon size={15} />
            {label}
        </Link>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const EventDetail = ({ event }) => {
    const { date: startDateStr, time: startTime } = formatEventDate(event.startDateTime);
    const { time: endTime } = formatEventDate(event.endDateTime);

    const startDate = new Date(event.startDateTime);
    const startDateLong = startDate.toLocaleDateString('en-PK', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });

    const isOnline = event.mode === 'ONLINE';
    const hasContact = event.contactEmail || event.whatsappNumber || event.instagramHandle;
    const hasSocialLinks = event.socialLinks?.length > 0;
    const hasTags = event.tags?.length > 0;

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

            {/* Banner */}
            {event.bannerUrl ? (
                <div className="w-full h-64 md:h-80 bg-gray-100 border-b border-gray-200">
                    <img
                        src={event.bannerUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-full h-24 bg-linear-to-r from-blue-50 to-indigo-50 border-b border-gray-200" />
            )}

            <div className="p-8 md:p-12">

                {/* ── Badges ── */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <EventStatusBadge status={event.status} />

                    {event.eventType && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-full">
                            {humanize(event.eventType)}
                        </span>
                    )}

                    {event.mode && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
                            {humanize(event.mode)}
                        </span>
                    )}

                    {event.isRegistrationRequired && (
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full">
                            Registration Required
                        </span>
                    )}
                </div>

                {/* ── Title ── */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {event.title}
                </h1>

                {/* ── Organizer line ── */}
                <p className="text-sm text-gray-500 mb-8 flex items-center gap-1.5">
                    <Users size={14} className="text-gray-400" />
                    Organized by{' '}
                    <span className="font-semibold text-gray-800">
                        {event.groupId?.name ?? 'UAF Society'}
                    </span>
                </p>

                {/* ── Quick Info Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">

                    <InfoTile
                        icon={Calendar}
                        label="Date & Time"
                        primary={startDateLong}
                        secondary={`${startTime} — ${endTime}`}
                    />

                    <InfoTile
                        icon={isOnline ? Video : MapPin}
                        label="Location"
                        primary={isOnline ? 'Virtual Event' : (event.venue || '—')}
                        secondary={isOnline && event.venue ? event.venue : null}
                    />

                </div>

                {/* ── AI Summary ── */}
                {event.aiSummary && (
                    <div className="mb-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={18} className="text-blue-600" />
                            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest">
                                AI Quick Summary
                            </h3>
                        </div>
                        <p className="text-blue-800 leading-relaxed text-sm">{event.aiSummary}</p>
                    </div>
                )}

                {/* ── Description ── */}
                <div className="mb-8">
                    <SectionHeading>About This Event</SectionHeading>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">
                        {event.description || 'No description provided.'}
                    </p>
                </div>

                {/* ── Tags ── */}
                {hasTags && (
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                        <Tag size={16} className="text-gray-400" />
                        {event.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* ── Contact Info ── */}
                {hasContact && (
                    <div className="mb-8">
                        <SectionHeading>Contact & Social</SectionHeading>
                        <div className="flex flex-wrap gap-3">
                            {event.contactEmail && (
                                <ContactChip
                                    icon={Mail}
                                    href={`mailto:${event.contactEmail}`}
                                    label={event.contactEmail}
                                    color="blue"
                                />
                            )}
                            {event.whatsappNumber && (
                                <ContactChip
                                    icon={Phone}
                                    href={`https://wa.me/${event.whatsappNumber.replace(/\D/g, '')}`}
                                    label={event.whatsappNumber}
                                    color="green"
                                />
                            )}
                            {event.instagramHandle && (
                                <ContactChip
                                    icon={Instagram}
                                    href={`https://instagram.com/${event.instagramHandle.replace('@', '')}`}
                                    label={event.instagramHandle}
                                    color="pink"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* ── Social / External Links ── */}
                {hasSocialLinks && (
                    <div className="mb-8">
                        <SectionHeading>Links</SectionHeading>
                        <div className="flex flex-wrap gap-3">
                            {event.socialLinks.map((link, i) => (
                                link.url && (
                                    <ContactChip
                                        key={i}
                                        icon={LinkIcon}
                                        href={link.url}
                                        label={link.label || link.url}
                                        color="gray"
                                    />
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Footer: CTA ── */}
                <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Registration note */}
                    {event.isRegistrationRequired && !event.registrationLink && (
                        <p className="flex items-center gap-1.5 text-sm text-amber-700">
                            <Info size={15} />
                            Registration is required. Contact the organizer for details.
                        </p>
                    )}

                    {!event.isRegistrationRequired && (
                        <p className="text-sm text-gray-400 italic">No registration required — just show up!</p>
                    )}

                    {event.registrationLink && event.status === 'PUBLISHED' && (
                        <Link
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
                        >
                            Register Now <ExternalLink size={16} />
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
};