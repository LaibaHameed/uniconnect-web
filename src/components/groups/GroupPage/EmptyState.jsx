import { Users } from "lucide-react";

export const EmptyState = () => {
    return (
        <div className="mt-12 text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No groups found</h3>
            <p className="text-sm text-gray-600">
                Try adjusting your filters or create a new group to get started.
            </p>
        </div>
    );
};