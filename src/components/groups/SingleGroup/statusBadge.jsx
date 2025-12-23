// StatusBadge Component
import {
    CheckCircle,
    Clock,
    XCircle,
} from "lucide-react";

export const StatusBadge = ({ status }) => {
    const statusConfig = {
        APPROVED: {
            icon: CheckCircle,
            className: "bg-green-100 text-green-700 border-green-200",
        },
        PENDING: {
            icon: Clock,
            className: "bg-yellow-100 text-yellow-700 border-yellow-200",
        },
        REJECTED: {
            icon: XCircle,
            className: "bg-red-100 text-red-700 border-red-200",
        },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${config.className}`}
        >
            <Icon className="w-3.5 h-3.5" />
            {status}
        </span>
    );
};