'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCreateEventMutation } from '@/redux/slices/events/eventsApi';
import { EventForm } from '@/components/events/EventForm';
import { toast } from 'react-hot-toast';

export default function CreateEventPage() {
  const { groupId } = useParams();
  const router = useRouter();
  const [createEvent, { isLoading }] = useCreateEventMutation();

  const handleOnSubmit = async (data) => {
    try {
      await createEvent({ groupId, body: data }).unwrap();
      toast.success("Event created successfully!");
      router.push(`/groups/${groupId}`);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Society
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Create New Event</h1>
          <p className="text-zinc-500 mt-2 text-base">Fill in the details below to broadcast a new activity.</p>
        </div>
        
        <EventForm 
          onSubmit={handleOnSubmit} 
          isLoading={isLoading} 
          onCancel={() => router.back()} 
        />
      </div>
    </div>
  );
}