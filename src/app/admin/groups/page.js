"use client";

import { useState } from "react";
import {
  Clock,
  Users,
  Shield,
  AlertCircle,
  Filter
} from "lucide-react";
import {
  useGetGroupsQuery,
  useDecideGroupStatusMutation,
} from "@/redux/slices/groups/groupsApi";
import { StatsCard } from "@/components/admin/groups/StatsCard";
import { LoadingSkeleton } from "@/components/groups/SingleGroup/LoadingSkeleton";
import { EmptyState } from "@/components/groups/GroupPage/EmptyState";
import { PendingGroupCard } from "@/components/admin/groups/PendingGroupCard";

// Main AdminGroupsPage Component
const AdminGroupsPage = () => {
  const { data, isLoading } = useGetGroupsQuery({ status: "PENDING" });
  const [decideStatus] = useDecideGroupStatusMutation();
  const [processingId, setProcessingId] = useState(null);

  const handleDecision = async (groupId, status) => {
    try {
      setProcessingId(groupId);
      await decideStatus({ groupId, status }).unwrap();
      alert(`Group ${status.toLowerCase()} successfully`);
    } catch (err) {
      alert(err?.data?.message || "Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-lineaar-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Review and manage pending group applications
              </p>
            </div>
          </div>

          {/* Stats */}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <StatsCard
                icon={Clock}
                label="Pending Reviews"
                value={data?.length || 0}
                color="yellow"
              />
              <StatsCard
                icon={Filter}
                label="Status Filter"
                value="Pending"
                color="blue"
              />
              <StatsCard
                icon={Users}
                label="Total Groups"
                value={data?.length || 0}
                color="blue"
              />
            </div>
          )}
        </div>

        {/* Alert Info */}
        {!isLoading && data && data.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900">Review Guidelines</h3>
              <p className="text-sm text-blue-700 mt-1">
                Please carefully review each group's information before approving or rejecting.
                Ensure the content aligns with university policies and community standards.
              </p>
            </div>
          </div>
        )}

        {/* Content Section */}
        {isLoading && <LoadingSkeleton />}

        {!isLoading && (!data || data.length === 0) && <EmptyState />}

        {!isLoading && data && data.length > 0 && (
          <div className="space-y-4">
            {data.map((group) => (
              <PendingGroupCard
                key={group._id}
                group={group}
                onDecision={handleDecision}
                isProcessing={processingId === group._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGroupsPage;