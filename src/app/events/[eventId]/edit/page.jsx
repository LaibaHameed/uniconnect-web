'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CalendarCog, AlertCircle } from 'lucide-react';
import { useGetEventByIdQuery, useUpdateEventMutation } from '@/redux/slices/events/eventsApi';
import { EventForm } from '@/components/events/EventForm';
import { InfoCard } from '@/components/groups/CreateGroup/InfoCard';
import { toast } from 'react-hot-toast';

// ── Helpers ────────────────────────────────────────────────────────────────

const toDateTimeLocal = (iso) =>
    iso ? new Date(iso).toISOString().slice(0, 16) : '';

/** Map raw API event → EventForm defaultValues shape */
const toFormDefaults = (event) => ({
    title:                  event.title               || '',
    description:            event.description         || '',
    eventType:              event.eventType           || '',
    mode:                   event.mode                || 'IN_PERSON',
    venue:                  event.venue               || '',
    startDateTime:          toDateTimeLocal(event.startDateTime),
    endDateTime:            toDateTimeLocal(event.endDateTime),
    whatsappNumber:         event.whatsappNumber      || '',
    contactEmail:           event.contactEmail        || '',
    instagramHandle:        event.instagramHandle     || '',
    isRegistrationRequired: event.isRegistrationRequired ?? false,
    registrationLink:       event.registrationLink    || '',
    tags:                   event.tags                || [],
});

// ── Loading skeleton ───────────────────────────────────────────────────────

function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-2 pt-1">
                            <div className="h-6 w-48 bg-gray-200 rounded" />
                            <div className="h-4 w-72 bg-gray-100 rounded" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-5">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-1.5">
                            <div className="h-3 w-24 bg-gray-200 rounded" />
                            <div className="h-10 bg-gray-100 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Error state ────────────────────────────────────────────────────────────

function ErrorState() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center">
                <p className="text-lg font-semibold text-gray-800 mb-2">Event not found</p>
                <p className="text-sm text-gray-500 mb-4">
                    This event may have been removed or doesn&apos;t exist.
                </p>
                <button
                    onClick={() => router.back()}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Go back
                </button>
            </div>
        </div>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function EditEventPage() {
    const { groupId, eventId } = useParams();
    const router = useRouter();

    const { data: event, isLoading, isError } = useGetEventByIdQuery(eventId);
    const [updateEvent, { isLoading: updating }] = useUpdateEventMutation();

    if (isLoading) return <LoadingSkeleton />;
    if (isError || !event) return <ErrorState />;

    const handleSubmit = async (data) => {
        try {
            await updateEvent({ eventId, body: data }).unwrap();
            toast.success('Event updated successfully!');
            router.push(`/events/${eventId}`);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update event');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Back */}
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Event
                </button>

                {/* Header Card — same structure as CreateEventPage */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shrink-0">
                            <CalendarCog className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Event</h1>
                            <p className="text-gray-600">
                                Update the details below. Changes will be visible to all group members immediately.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="mb-6">
                    <InfoCard
                        icon={AlertCircle}
                        title="Heads Up"
                        description="Editing a published event updates it live. Double-check dates, venue, and registration details before saving."
                    />
                </div>

                {/* Reuse EventForm — initialData pre-fills all fields */}
                <EventForm
                    initialData={toFormDefaults(event)}
                    onSubmit={handleSubmit}
                    isLoading={updating}
                    onCancel={() => router.back()}
                    submitLabel="Update Event"
                />

            </div>
        </div>
    );
}