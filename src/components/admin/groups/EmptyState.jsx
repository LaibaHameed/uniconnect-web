import { CheckCircle } from "lucide-react";

export const EmptyState = () => {
    return (
        <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                All Caught Up!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
                There are no pending groups to review at the moment. New submissions will appear here.
            </p>
        </div>
    );
};