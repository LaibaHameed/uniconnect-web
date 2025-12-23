"use client";

import { useParams, useRouter } from "next/navigation";
import {
    Users,
    Tag,
    UserPlus,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import {
    useGetGroupByIdQuery,
    useCreateJoinRequestMutation,
    useListMembersQuery,
} from "@/redux/slices/groups/groupsApi";
import { LoadingSkeleton } from "@/components/groups/SingleGroup/LoadingSkeleton";
import { ErrorState } from "@/components/groups/SingleGroup/ErrorState";
import { StatusBadge } from "@/components/groups/SingleGroup/statusBadge";
import { MemberCard } from "@/components/groups/SingleGroup/MemberCard";
import { useSelector } from "react-redux";


// Main GroupDetailsPage Component
const GroupDetailsPage = () => {
    const { groupId } = useParams();

    const { data: group, isLoading, isError } = useGetGroupByIdQuery(groupId);
    const { data: members } = useListMembersQuery({ groupId });
    const [joinGroup, { isLoading: joining }] = useCreateJoinRequestMutation();
    const router = useRouter();
    const { token, profileCompleted } = useSelector((state) => state.auth);

    const profileId = useSelector((state) => state.auth.profileId);

    // 1️⃣ check if current user is a member
    const isMember = Boolean(
        members?.some((m) => {
            const memberProfileId = m?.profile?._id || m?.profileId;
            return memberProfileId === profileId;
        })
    );

    // 2️⃣ check if current user is admin of this group
    // depends on your backend shape; common patterns:
    const isAdmin =
        group?.admins?.includes(profileId) ||
        group?.createdBy === profileId ||
        group?.owner === profileId;

    // 3️⃣ optional: check if join request already sent
    const hasPendingRequest = Boolean(
        group?.joinRequests?.some(
            (req) => req.profile === profileId && req.status === "PENDING"
        )
    );



    const handleJoin = async () => {
        if (!token) {
            alert("Please login first");
            router.push("/auth/login");
            return;
        }

        if (!profileCompleted) {
            alert("Please complete your profile before joining a group");
            router.push("/profile/setup");
            return;
        }

        try {
            await joinGroup({ groupId }).unwrap();
            alert("Request sent / Joined successfully");
        } catch (err) {
            alert(err?.data?.message || "Join failed");
        }
    };

    if (isLoading) return <LoadingSkeleton />;
    if (isError || !group) return <ErrorState />;

    const typeColors = {
        CLUB: "bg-blue-100 text-blue-700 border-blue-200",
        SOCIETY: "bg-purple-100 text-purple-700 border-purple-200",
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/groups"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Groups
                </Link>

                {/* Group Header Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                {group.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span
                                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${typeColors[group.type] || "bg-gray-100 text-gray-700 border-gray-200"
                                        }`}
                                >
                                    <Tag className="w-3.5 h-3.5" />
                                    {group.type}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border bg-gray-100 text-gray-700 border-gray-200">
                                    {group.category}
                                </span>
                                <StatusBadge status={group.status} />
                            </div>

                            {group.description && (
                                <p className="text-gray-700 leading-relaxed">
                                    {group.description}
                                </p>
                            )}
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex flex-col gap-2">
                            {/* Admin: view join requests */}
                            {isAdmin && (
                                <button
                                    onClick={() =>
                                        router.push(`/groups/${groupId}/admin/join-requests`)
                                    }
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white font-medium rounded-lg"
                                >
                                    <Users className="w-5 h-5" />
                                    View Join Requests
                                </button>
                            )}

                            {/* Non-member user can join */}
                            {!isAdmin && !isMember && (
                                <button
                                    onClick={handleJoin}
                                    disabled={joining || hasPendingRequest || !profileCompleted}
                                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 cursor-pointer
        ${hasPendingRequest
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700"
                                        }
        text-white font-medium rounded-lg`}
                                >
                                    <UserPlus className="w-5 h-5" />
                                    {hasPendingRequest ? "Request Sent" : joining ? "Processing..." : "Join Group"}
                                </button>
                            )}

                            {/* Already member */}
                            {isMember && !isAdmin && (
                                <div className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg text-center cursor-pointer font-medium">
                                    You are already a member
                                </div>
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
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No members yet
                            </h3>
                            <p className="text-sm text-gray-600">
                                Be the first to join this group!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupDetailsPage;