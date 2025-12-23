import {
  CheckCircle,
  XCircle,
  Clock,
  Tag,
  FileText,
  Shield
} from "lucide-react";

export const PendingGroupCard = ({ group, onDecision, isProcessing }) => {
    const typeColors = {
        CLUB: "bg-blue-100 text-blue-700 border-blue-200",
        SOCIETY: "bg-purple-100 text-purple-700 border-purple-200",
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {group.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
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
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border bg-yellow-100 text-yellow-700 border-yellow-200">
                            <Clock className="w-3.5 h-3.5" />
                            Pending Review
                        </span>
                    </div>
                </div>
            </div>

            {group.description && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {group.description}
                        </p>
                    </div>
                </div>
            )}

            {group.joinPolicy && (
                <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Join Policy: <strong>{group.joinPolicy.replace(/_/g, ' ')}</strong></span>
                </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                    onClick={() => onDecision(group._id, "APPROVED")}
                    disabled={isProcessing}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                    <CheckCircle className="w-5 h-5" />
                    Approve
                </button>
                <button
                    onClick={() => onDecision(group._id, "REJECTED")}
                    disabled={isProcessing}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                    <XCircle className="w-5 h-5" />
                    Reject
                </button>
            </div>
        </div>
    );
};