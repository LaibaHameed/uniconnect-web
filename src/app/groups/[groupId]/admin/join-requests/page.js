"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Mail,
    FileText,
    AlertCircle,
    Users,
    Clock,
} from "lucide-react";
import {
    useListJoinRequestsQuery,
    useDecideJoinRequestMutation,
} from "@/redux/slices/groups/groupsApi";

// ── Helpers ────────────────────────────────────────────────────────────────

const getInitial = (name) =>
    name?.charAt(0).toUpperCase() || "U";

const timeAgo = (iso) => {
    if (!iso) return "";
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
};

// ── Sub-components ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-24 bg-white border border-gray-200 rounded-xl" />
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex gap-4">
                            <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-1/3" />
                                <div className="h-3 bg-gray-100 rounded w-1/2" />
                                <div className="flex gap-3 pt-2">
                                    <div className="flex-1 h-9 bg-gray-100 rounded-lg" />
                                    <div className="flex-1 h-9 bg-gray-100 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ErrorState({ groupId }) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-sm">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-100 mb-4">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Access Denied</h2>
                <p className="text-sm text-gray-500 mb-6">
                    You don't have permission to view join requests for this group.
                </p>
                <Link
                    href={`/groups/${groupId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Group
                </Link>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center justify-center py-20 text-center px-8">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-gray-400" />
                </div>
                <p className="font-semibold text-gray-800 text-sm">No pending requests</p>
                <p className="text-xs text-gray-400 mt-1">New join requests will appear here.</p>
            </div>
        </div>
    );
}

function RequestCard({ req, onDecide, isBusy }) {
    const name = req.userId?.fullName || "Unknown User";
    const email = req.userId?.email || "No email";

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all duration-150">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white font-bold text-base">{getInitial(name)}</span>
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                    {/* Name + time */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                        {req.createdAt && (
                            <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                                <Clock className="w-3 h-3" />
                                {timeAgo(req.createdAt)}
                            </span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-1.5 mb-3">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <p className="text-xs text-gray-500 truncate">{email}</p>
                    </div>

                    {/* Note */}
                    {req.note && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-start gap-2">
                                <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-gray-500 mb-0.5">Note</p>
                                    <p className="text-sm text-gray-700 leading-relaxed">{req.note}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                        <button
                            disabled={isBusy}
                            onClick={() => onDecide(req._id, "APPROVED")}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                        </button>
                        <button
                            disabled={isBusy}
                            onClick={() => onDecide(req._id, "REJECTED")}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium rounded-lg transition-colors"
                        >
                            <XCircle className="w-4 h-4" />
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────

const JoinRequestsPage = () => {
    const { groupId } = useParams();
    const { data, isLoading, isError, refetch } = useListJoinRequestsQuery({ groupId });
    const [decideRequest, { isLoading: deciding }] = useDecideJoinRequestMutation();
    const [busyId, setBusyId] = useState(null);

    const pendingRequests = (data || []).filter((req) => req?.status === "PENDING");

    const handleDecision = async (requestId, decision) => {
        try {
            setBusyId(requestId);
            await decideRequest({ groupId, requestId, decision }).unwrap();
            await refetch();
        } catch (err) {
            alert(err?.data?.message || "Action failed");
        } finally {
            setBusyId(null);
        }
    };

    if (isLoading) return <LoadingSkeleton />;
    if (isError) return <ErrorState groupId={groupId} />;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Back */}
                <Link
                    href={`/groups/${groupId}`}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Group
                </Link>

                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Join Requests</h1>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Review and manage membership requests
                            </p>
                        </div>
                        {pendingRequests.length > 0 && (
                            <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold rounded-full">
                                {pendingRequests.length} pending
                            </span>
                        )}
                    </div>
                </div>

                {/* List / Empty */}
                {pendingRequests.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-3">
                        {pendingRequests.map((req) => (
                            <RequestCard
                                key={req._id}
                                req={req}
                                onDecide={handleDecision}
                                isBusy={deciding || busyId === req._id}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default JoinRequestsPage;