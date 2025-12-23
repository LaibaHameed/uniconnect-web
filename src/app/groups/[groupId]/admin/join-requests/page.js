"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Mail,
    User,
    FileText,
    AlertCircle
} from "lucide-react";
import {
    useListJoinRequestsQuery,
    useDecideJoinRequestMutation,
} from "@/redux/slices/groups/groupsApi";

const JoinRequestsPage = () => {
    const { groupId } = useParams();

    const {
        data,
        isLoading,
        isError,
        refetch, // ✅ ADD THIS
    } = useListJoinRequestsQuery({ groupId });

    const [decideRequest, { isLoading: deciding }] = useDecideJoinRequestMutation();
    const [busyId, setBusyId] = useState(null); // ✅ prevent double click per row

    // ✅ FRONTEND FILTER: ONLY PENDING
    const pendingRequests = (data || []).filter((req) => req?.status === "PENDING");

    const handleDecision = async (requestId, decision) => {
        try {
            setBusyId(requestId);

            await decideRequest({
                groupId,
                requestId,
                decision,
            }).unwrap();

            alert(`Request ${decision.toLowerCase()}`);

            // ✅ FORCE REFETCH (so approved/rejected disappears)
            await refetch();
        } catch (err) {
            alert(err?.data?.message || "Action failed");
        } finally {
            setBusyId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                                    <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Access Denied
                            </h2>
                            <p className="text-sm text-gray-600 mb-6">
                                You don't have permission to view join requests for this group.
                            </p>
                            <Link
                                href={`/groups/${groupId}`}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Group
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    href={`/groups/${groupId}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Group
                </Link>

                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Join Requests</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Review and manage membership requests for your group
                    </p>
                </div>

                {/* Empty State */}
                {pendingRequests.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <User className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No Pending Requests
                            </h3>
                            <p className="text-sm text-gray-600">
                                There are no join requests at the moment. New requests will appear here.
                            </p>
                        </div>
                    </div>
                )}

                {/* Requests List */}
                <div className="space-y-4">
                    {pendingRequests.map((req) => (
                        <div
                            key={req._id}
                            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                                    <span className="text-white font-semibold text-lg">
                                        {req.userId?.name?.charAt(0).toUpperCase() || "?"}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <p className="font-semibold text-gray-900">
                                                {req.userId?.name || "Unknown User"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <p className="text-sm text-gray-600">
                                                {req.userId?.email || "No email"}
                                            </p>
                                        </div>
                                    </div>

                                    {req.note && (
                                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="flex items-start gap-2">
                                                <FileText className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-700 mb-1">
                                                        Message from applicant:
                                                    </p>
                                                    <p className="text-sm text-gray-700">{req.note}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            disabled={deciding || busyId === req._id}
                                            onClick={() => handleDecision(req._id, "APPROVED")}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors cursor-pointer"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Approve
                                        </button>
                                        <button
                                            disabled={deciding || busyId === req._id}
                                            onClick={() => handleDecision(req._id, "REJECTED")}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors cursor-pointer"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JoinRequestsPage;
