'use client';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useGetEventByIdQuery } from '@/redux/slices/events/eventsApi';
import { EventDetail } from '@/components/events/EventDetail';

export default function SingleEventPage() {
    const { eventId } = useParams();
    const router = useRouter();
    
    const { data: event, isLoading, isError } = useGetEventByIdQuery(eventId);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-50 py-10 px-4 flex justify-center pt-32">
                <div className="text-zinc-500 font-medium animate-pulse">Loading event details...</div>
            </div>
        );
    }

    if (isError || !event) {
        return (
            <div className="min-h-screen bg-zinc-50 py-10 px-4 flex flex-col items-center pt-32">
                <h2 className="text-2xl font-bold text-zinc-900 mb-2">Event Not Found</h2>
                <p className="text-zinc-500 mb-6">The event you are looking for does not exist or has been removed.</p>
                <button onClick={() => router.push('/events')} className="px-6 py-2.5 bg-white border border-zinc-200 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-50 transition-colors">
                    Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition mb-8 group font-medium"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <EventDetail event={event} />

            </div>
        </div>
    );
}