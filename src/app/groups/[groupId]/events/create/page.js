'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CalendarPlus, AlertCircle } from 'lucide-react';
import { useCreateEventMutation } from '@/redux/slices/events/eventsApi';
import { EventForm } from '@/components/events/EventForm';
import { InfoCard } from '@/components/groups/CreateGroup/InfoCard';
import { toast } from 'react-hot-toast';

export default function CreateEventPage() {
  const { groupId } = useParams();
  const router = useRouter();
  const [createEvent, { isLoading }] = useCreateEventMutation();

  const handleOnSubmit = async (data) => {
    try {
      await createEvent({ groupId, body: data }).unwrap();
      toast.success('Event created successfully!');
      router.push(`/groups/${groupId}`);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create event');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Society
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shrink-0">
              <CalendarPlus className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
              <p className="text-gray-600">
                Fill in the details below to broadcast a new activity for your group.
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mb-6">
          <InfoCard
            icon={AlertCircle}
            title="Heads Up"
            description="Once published, members will be notified about this event. Make sure all details are accurate before submitting."
          />
        </div>

        {/* Form */}
        <EventForm
          onSubmit={handleOnSubmit}
          isLoading={isLoading}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}