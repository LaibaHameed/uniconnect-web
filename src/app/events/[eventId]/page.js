'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useGetEventByIdQuery, useCancelEventMutation } from '@/redux/slices/events/eventsApi';
import { EventDetail } from '@/components/events/EventDetail';
import { EventDetailSkeleton } from '@/components/events/EventDetailSkeleton';
import { useSelector } from "react-redux";
import { useListMembersQuery } from "@/redux/slices/groups/groupsApi";
import { useGroupAccess } from "@/hooks/useGroupAccess";

const EventNotFound = ({ onBack }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
        <p className="text-gray-600 mb-6">
            The event you are looking for does not exist or has been removed.
        </p>
        <button
            onClick={onBack}
            className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
            Back to Events
        </button>
    </div>
);

export default function SingleEventPage() {
    const { userId } = useSelector((state) => state.auth);
    const { eventId } = useParams();
    const router = useRouter();
    const [cancelEvent, { isLoading: isCancelling }] =
        useCancelEventMutation();

    const { data: event, isLoading, isError } = useGetEventByIdQuery(eventId);

    const groupId = event?.groupId?._id;

    const { data: members } = useListMembersQuery(
        { groupId },
        { skip: !groupId }
    );

    const { isAdmin } = useGroupAccess({
        members,
        userId,
    });

    const isCreator = event?.createdBy === userId;
    const canManageEvent = isAdmin || isCreator;

    const showNotFound = !isLoading && (isError || !event);
    const showDetail = !isLoading && !isError && event;

    const handleCancelEvent = async () => {
        try {
            await cancelEvent(eventId).unwrap();

            alert('Event cancelled successfully');

            router.refresh();
        } catch (error) {
            console.error(error);
            alert(error?.data?.message || 'Failed to cancel event');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">

                <button
                    onClick={() => router.push('/events')}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Events
                </button>

                {isLoading && <EventDetailSkeleton />}
                {showNotFound && <EventNotFound onBack={() => router.push('/events')} />}
                {showDetail && <EventDetail event={event} onCancel={handleCancelEvent}
                    isCancelling={isCancelling} canManageEvent={canManageEvent} />}

            </div>
        </div>
    );
}