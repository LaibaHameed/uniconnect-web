"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Monitor,
  Tag,
  ExternalLink,
  Sparkles,
  Users,
  Pencil,
  XCircle,
  Trash2,
} from "lucide-react";
import {
  useGetEventByIdQuery,
  useCancelEventMutation,
  useDeleteEventMutation,
} from "@/redux/slices/events/eventsApi";
import { useListMembersQuery } from "@/redux/slices/groups/groupsApi";
import { useGroupAccess } from "@/hooks/useGroupAccess";

// ── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Status badge ───────────────────────────────────────────────────────────

const statusConfig = {
  DRAFT:     { label: "Draft",     cls: "bg-zinc-100 text-zinc-600 border-zinc-200" },
  PUBLISHED: { label: "Published", cls: "bg-green-100 text-green-700 border-green-200" },
  CANCELLED: { label: "Cancelled", cls: "bg-red-100 text-red-600 border-red-200" },
  COMPLETED: { label: "Completed", cls: "bg-blue-100 text-blue-700 border-blue-200" },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] ?? statusConfig.DRAFT;
  return (
    <span className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

// ── Mode badge ─────────────────────────────────────────────────────────────

const modeConfig = {
  ONLINE:    { label: "Online",    icon: Monitor,  cls: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  IN_PERSON: { label: "In Person", icon: MapPin,   cls: "bg-amber-50 text-amber-600 border-amber-200" },
  HYBRID:    { label: "Hybrid",    icon: Users,    cls: "bg-teal-50 text-teal-600 border-teal-200" },
};

function ModeBadge({ mode }) {
  const cfg = modeConfig[mode] ?? modeConfig.IN_PERSON;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${cfg.cls}`}>
      <Icon className="w-3.5 h-3.5" />
      {cfg.label}
    </span>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
          <div className="h-6 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}

// ── Error state ────────────────────────────────────────────────────────────

function ErrorState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-800 mb-2">Event not found</p>
        <p className="text-sm text-gray-500 mb-4">This event may have been removed or doesn't exist.</p>
        <Link href="/events" className="text-sm text-blue-600 hover:underline">
          Browse all events
        </Link>
      </div>
    </div>
  );
}

// ── Info row ───────────────────────────────────────────────────────────────

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0 w-8 h-8 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-gray-500" />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-800 font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function EventDetailPage() {
  const { eventId } = useParams();
  const router = useRouter();
  const { userId, token } = useSelector((state) => state.auth);

  const { data: event, isLoading, isError } = useGetEventByIdQuery(eventId);
  const { data: members } = useListMembersQuery(
    { groupId: event?.groupId },
    { skip: !event?.groupId },
  );
  const { isAdmin } = useGroupAccess({ members, userId });

  const [cancelEvent, { isLoading: cancelling }] = useCancelEventMutation();
  const [deleteEvent, { isLoading: deleting }]   = useDeleteEventMutation();

  if (isLoading) return <LoadingSkeleton />;
  if (isError || !event) return <ErrorState />;

  const isCancellable = ["DRAFT", "PUBLISHED"].includes(event.status);
  const isDeletable   = event.status !== "COMPLETED";

  const handleCancel = async () => {
    if (!confirm("Cancel this event? This cannot be undone.")) return;
    try {
      await cancelEvent(eventId).unwrap();
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this event? It will be permanently removed.")) return;
    try {
      await deleteEvent(eventId).unwrap();
      router.push(`/groups/${event.groupId}`);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href={`/groups/${event.groupId}`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Group
        </Link>

        {/* Banner */}
        {event.bannerUrl && (
          <div className="w-full h-52 sm:h-64 rounded-xl overflow-hidden mb-6 border border-gray-200">
            <img
              src={event.bannerUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6">

          {/* Title + badges */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={event.status} />
                <ModeBadge mode={event.mode} />
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border bg-gray-100 text-gray-700 border-gray-200">
                  <Tag className="w-3.5 h-3.5" />
                  {event.eventType.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            {/* Admin actions */}
            {isAdmin && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => router.push(`/groups/${event.groupId}/events/${eventId}/edit`)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                {isCancellable && (
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 disabled:opacity-50 transition"
                  >
                    <XCircle className="w-4 h-4" />
                    {cancelling ? "Cancelling..." : "Cancel"}
                  </button>
                )}
                {isDeletable && (
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 mb-6">
            <InfoRow
              icon={Calendar}
              label="Date"
              value={formatDate(event.startDateTime)}
            />
            <InfoRow
              icon={Clock}
              label="Time"
              value={`${formatTime(event.startDateTime)} – ${formatTime(event.endDateTime)}`}
            />
            {event.venue && (
              <InfoRow icon={MapPin} label="Venue" value={event.venue} />
            )}
          </div>

          {/* AI Summary */}
          {event.aiSummary && (
            <div className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg mb-6">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  AI Summary
                </p>
                <p className="text-sm text-blue-800 leading-relaxed">{event.aiSummary}</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-2">About this event</h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Tags */}
          {event.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-gray-100">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Registration CTA */}
        {event.registrationLink && event.status === "PUBLISHED" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Ready to attend?</h3>
              <p className="text-sm text-gray-500 mt-0.5">Register now to secure your spot.</p>
            </div>
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shrink-0"
            >
              Register Now
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
}