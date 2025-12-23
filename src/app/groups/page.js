"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw, TrendingUp } from "lucide-react";
import { useGetGroupsQuery } from "@/redux/slices/groups/groupsApi";
import { FilterSelect } from "@/components/groups/GroupPage/FilterSelect";
import { LoadingState } from "@/components/groups/GroupPage/LoadingState";
import { GroupCard } from "@/components/groups/GroupPage/GroupCard";
import { EmptyState } from "@/components/groups/GroupPage/EmptyState";
import { ErrorAlert } from "@/components/groups/GroupPage/ErrorAlert";

// ✅ add these
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// Main GroupsPage Component
const GroupsPage = () => {
    const router = useRouter();

    // ✅ get auth state
    const { token, profileCompleted } = useSelector((state) => state.auth);

    const [type, setType] = useState("");
    const [status, setStatus] = useState("APPROVED");
    const queryArgs = useMemo(() => ({ type, status }), [type, status]);
    const { data, isLoading, isError, error, refetch } = useGetGroupsQuery(queryArgs);

    const errMsg = error?.data?.message || error?.error || "Failed to load groups";

    const typeOptions = [
        { value: "", label: "All Types" },
        { value: "CLUB", label: "Clubs" },
        { value: "SOCIETY", label: "Societies" },
    ];

    const statusOptions = [
        { value: "APPROVED", label: "Approved" },
        { value: "PENDING", label: "Pending" },
        { value: "REJECTED", label: "Rejected" },
    ];

    // ✅ Create Group guard
    const handleCreateGroupClick = () => {
        try {
            if (!token) {
                alert("Please login first");
                router.push("/auth/login");
                return;
            }

            if (!profileCompleted) {
                alert("Please complete your profile before creating a group");
                router.push("/profile/setup");
                return;
            }

            router.push("/groups/create");
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                <TrendingUp className="w-8 h-8 text-blue-600" />
                                Clubs & Societies
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Discover and join communities that match your interests
                            </p>
                        </div>

                        {/* ✅ replaced Link with guarded button */}
                        <button
                            type="button"
                            onClick={handleCreateGroupClick}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                        >
                            <Plus className="w-5 h-5" />
                            Create Group
                        </button>
                    </div>

                    {/* Filters Section */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <FilterSelect
                                label="Filter by Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                options={typeOptions}
                            />
                            <FilterSelect
                                label="Filter by Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                options={statusOptions}
                            />
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-600">Actions</label>
                                <button
                                    onClick={refetch}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                {isLoading && <LoadingState />}
                {isError && <ErrorAlert message={errMsg} />}
                {!isLoading && !isError && (
                    <>
                        {data && data.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-4">
                                {data.map((group) => (
                                    <GroupCard key={group._id} group={group} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default GroupsPage;
