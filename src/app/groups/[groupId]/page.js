"use client";

import { useParams, useRouter } from "next/navigation";
import { Users, Tag, ArrowLeft, Plus, Calendar, MapPin, Pencil, Clock } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
    useGetGroupByIdQuery,
    useCreateJoinRequestMutation,
    useListMembersQuery,
    useCancelMyJoinRequestMutation,
    useGetMyJoinRequestQuery,
} from "@/redux/slices/groups/groupsApi";
import { useGetEventsQuery } from "@/redux/slices/events/eventsApi";
import { useGroupAccess } from "@/hooks/useGroupAccess";
import { LoadingSkeleton } from "@/components/groups/SingleGroup/LoadingSkeleton";
import { ErrorState } from "@/components/groups/SingleGroup/ErrorState";
import { StatusBadge } from "@/components/groups/SingleGroup/statusBadge";
import { MemberCard } from "@/components/groups/SingleGroup/MemberCard";
import SectionCard from "@/components/groups/SingleGroup/SectionCard";
import SectionHeader from "@/components/groups/SingleGroup/SectionHeader";
import EventCard from "@/components/groups/SingleGroup/EventCard";
import JoinButton from "@/components/groups/SingleGroup/JoinButton";

// ─── Constants ────────────────────────────────────────────────────────────────

const GROUP_TYPE_STYLES = {
    CLUB: "bg-blue-50 text-blue-700 border-blue-200",
    SOCIETY: "bg-violet-50 text-violet-700 border-violet-200",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const EmptyState = ({ icon: Icon, title, subtitle }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center px-8">
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-slate-400" />
        </div>
        <p className="font-semibold text-slate-700 text-sm">{title}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const GroupDetailsPage = () => {
    const router = useRouter();
    const { groupId } = useParams();
    const { token, profileCompleted, userId } = useSelector((state) => state.auth);

    const { data: members } = useListMembersQuery({ groupId });
    const { data: group, isLoading, isError } = useGetGroupByIdQuery(groupId);
    const { isMember, isAdmin } = useGroupAccess({ members, userId });

    const [joinGroup, { isLoading: joining }] = useCreateJoinRequestMutation();
    const [cancelRequest, { isLoading: cancelling }] = useCancelMyJoinRequestMutation();

    const {
        data: myJoinRequest,
        isLoading: isLoadingRequest,
        isFetching: isFetchingRequest,
    } = useGetMyJoinRequestQuery({ groupId }, { skip: !groupId || !token });

    const { data: eventsData, isLoading: eventsLoading } = useGetEventsQuery({ groupId });

    const hasPendingRequest = myJoinRequest?.status === "PENDING";

    if (isLoading) return <LoadingSkeleton />;
    if (isError || !group) return <ErrorState />;

    const handleJoin = () => {
        if (!token) { router.push("/auth/login"); return; }
        if (!profileCompleted) {
            alert("Please complete your profile before joining a group.");
            router.push("/profile?redirect=join-society");
            return;
        }
        joinGroup({ groupId });
    };

    const handleCancelRequest = async () => {
        try {
            await cancelRequest({ groupId }).unwrap();
        } catch (error) {
            console.error("Cancel request error:", error);
        }
    };

    const typeStyle = GROUP_TYPE_STYLES[group.type] || "bg-slate-100 text-slate-700 border-slate-200";
    const isRequestLoading = isLoadingRequest || isFetchingRequest;

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-5">

                {/* Back */}
                <Link
                    href="/groups"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    All Groups
                </Link>

                {/* ── Hero Card ── */}
                <SectionCard>
                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                            <div className="flex-1 min-w-0">
                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${typeStyle}`}>
                                        <Tag className="w-3 h-3" />
                                        {group.type}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-slate-50 text-slate-600 border-slate-200">
                                        {group.category}
                                    </span>
                                    <StatusBadge status={group.status} />
                                </div>

                                <h1 className="text-2xl font-black text-slate-900 leading-tight">
                                    {group.name}
                                </h1>

                                {group.description && (
                                    <p className="text-sm text-slate-600 mt-3 leading-relaxed whitespace-pre-line max-w-xl">
                                        {group.description}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 shrink-0">
                                {isRequestLoading ? (
                                    <div className="h-10 w-32 bg-slate-100 rounded-xl animate-pulse" />
                                ) : (
                                    <>
                                        {isAdmin && (
                                            <>
                                                <button
                                                    onClick={() => router.push(`/groups/${groupId}/edit`)}
                                                    className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    Edit Group
                                                </button>
                                                <button
                                                    onClick={() => router.push(`/groups/${groupId}/events/create`)}
                                                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                    Create Event
                                                </button>
                                                <button
                                                    onClick={() => router.push(`/groups/${groupId}/admin/join-requests`)}
                                                    className="border border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                                                >
                                                    Join Requests
                                                </button>
                                            </>
                                        )}

                                        <JoinButton
                                            isAdmin={isAdmin}
                                            isMember={isMember}
                                            hasPendingRequest={hasPendingRequest}
                                            joining={joining}
                                            cancelling={cancelling}
                                            onJoin={handleJoin}
                                            onCancel={handleCancelRequest}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* ── Events ── */}
                <SectionCard>
                    <SectionHeader title={`Events ${eventsData?.data?.length > 0 ? `(${eventsData.data.length})` : ""}`}>
                        {isAdmin && (
                            <button
                                onClick={() => router.push(`/groups/${groupId}/events/create`)}
                                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Create
                            </button>
                        )}
                    </SectionHeader>

                    <div className="px-8 pb-6 pt-4">
                        {eventsLoading ? (
                            <div className="space-y-3">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : eventsData?.data?.length > 0 ? (
                            <div className="space-y-2">
                                {eventsData.data.map((event) => (
                                    <EventCard
                                        key={event._id}
                                        event={event}
                                        isAdmin={isAdmin}
                                        groupId={groupId}
                                        router={router}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={Calendar}
                                title="No events yet"
                                subtitle={isAdmin ? "Create your first event to get started" : "Check back later for upcoming events"}
                            />
                        )}
                    </div>
                </SectionCard>

                {/* ── Members ── */}
                <SectionCard>
                    <SectionHeader
                        title={`Members${members?.length > 0 ? ` (${members.length})` : ""}`}
                    />

                    <div className="px-8 pb-6 pt-4">
                        {members?.length > 0 ? (
                            <ul className="space-y-2">
                                {members.map((member) => (
                                    <MemberCard
                                        key={member._id}
                                        member={member}
                                        isAdmin={isAdmin}
                                        currentUserId={userId}
                                        groupId={groupId}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <EmptyState
                                icon={Users}
                                title="No members yet"
                                subtitle="Be the first to join this group!"
                            />
                        )}
                    </div>
                </SectionCard>

            </div>
        </div>
    );
};

export default GroupDetailsPage;