"use client";

import { useParams, useRouter } from "next/navigation";
import { Users, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
    useGetGroupByIdQuery,
    useCreateJoinRequestMutation,
    useListMembersQuery,
    useCancelMyJoinRequestMutation,
    useGetMyJoinRequestQuery,
} from "@/redux/slices/groups/groupsApi";
import { LoadingSkeleton } from "@/components/groups/SingleGroup/LoadingSkeleton";
import { ErrorState } from "@/components/groups/SingleGroup/ErrorState";
import { StatusBadge } from "@/components/groups/SingleGroup/statusBadge";
import { MemberCard } from "@/components/groups/SingleGroup/MemberCard";
import { useSelector } from "react-redux";
import { useGroupAccess } from "@/hooks/useGroupAccess";

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
        isFetching: isFetchingRequest // Helpful to detect background updates
    } = useGetMyJoinRequestQuery(
        { groupId },
        { skip: !groupId || !token }
    );

    const hasPendingRequest = myJoinRequest?.status === "PENDING";

    if (isLoading) return <LoadingSkeleton />;
    if (isError || !group) return <ErrorState />

    // app/societies/[id]/page.js

    const handleJoinClick = () => {
        if (!token) {
            router.push("/auth/login");
            return;
        }

        // Single check: if profile is not completed, go to /profile
        if (!profileCompleted) {
            alert("Please complete your profile details before joining a society.");
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

    if (isLoading) return <LoadingSkeleton />;
    if (isError || !group) return <ErrorState />;

    const typeColors = {
        CLUB: "bg-blue-100 text-blue-700 border-blue-200",
        SOCIETY: "bg-purple-100 text-purple-700 border-purple-200",
    };

    // console.log('DEBUG: Frontend Join Status:', {
    //     isLoadingRequest,
    //     myJoinRequest,
    //     hasPending: myJoinRequest?.status === "PENDING"
    // });

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/groups"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Groups
                </Link>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                {group.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${typeColors[group.type] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                                    <Tag className="w-3.5 h-3.5" />
                                    {group.type}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border bg-gray-100 text-gray-700 border-gray-200">
                                    {group.category}
                                </span>
                                <StatusBadge status={group.status} />
                            </div>
                            {group.description && (
                                <p className="text-gray-700 leading-relaxed">{group.description}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            {(isLoadingRequest || isFetchingRequest) ? (
                                <button disabled className="bg-gray-200 text-gray-400 px-6 py-3 rounded-lg animate-pulse">
                                    Checking status...
                                </button>
                            ) : (
                                <>
                                    {/* ADMIN */}
                                    {isAdmin && (
                                        <button
                                            onClick={() => router.push(`/groups/${groupId}/admin/join-requests`)}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg cursor-pointer"
                                        >
                                            View Join Requests
                                        </button>
                                    )}

                                    {/* PENDING REQUEST */}
                                    {!isAdmin && !isMember && hasPendingRequest && (
                                        <button
                                            onClick={handleCancelRequest}
                                            disabled={cancelling}
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg cursor-pointer"
                                        >
                                            {cancelling ? "Cancelling..." : "Request Pending (Cancel)"}
                                        </button>
                                    )}

                                    {/* JOIN BUTTON - Only shows if NOT loading, NOT member, NOT admin, and NO pending request */}
                                    {!isAdmin && !isMember && !hasPendingRequest && (
                                        <button
                                            onClick={handleJoin}
                                            disabled={joining}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer"
                                        >
                                            {joining ? "Processing..." : "Join Group"}
                                        </button>
                                    )}

                                    {/* MEMBER */}
                                    {isMember && !isAdmin && (
                                        <div className="bg-green-100 text-green-700 px-6 py-3 rounded-lg text-center font-medium border border-green-200 ">
                                            You are a Member
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Members Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Members
                            {members && members.length > 0 && (
                                <span className="ml-2 text-base font-normal text-gray-500">
                                    ({members.length})
                                </span>
                            )}
                        </h2>
                    </div>

                    {members && members.length > 0 ? (
                        <ul className="space-y-3">
                            {members.map((member) => (
                                <MemberCard key={member._id} member={member} />
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <Users className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No members yet</h3>
                            <p className="text-sm text-gray-600">Be the first to join this group!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupDetailsPage;