import { AlertCircle } from "lucide-react";

export const ErrorAlert = ({ message }) => {
    return (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
                <h3 className="text-sm font-semibold text-red-800">Error Loading Groups</h3>
                <p className="text-sm text-red-700 mt-1">{message}</p>
            </div>
        </div>
    );
};