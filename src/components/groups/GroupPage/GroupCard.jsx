import Link from "next/link";
import { Users} from "lucide-react";

export const GroupCard = ({ group }) => {
    const statusColors = {
        APPROVED: "bg-green-100 text-green-700 border-green-200",
        PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
        REJECTED: "bg-red-100 text-red-700 border-red-200",
    };

    const typeColors = {
        CLUB: "bg-blue-100 text-blue-700 border-blue-200",
        SOCIETY: "bg-purple-100 text-purple-700 border-purple-200",
    };

    return (
        <Link
            href={`/groups/${group._id}`}
            className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex flex-col gap-3"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {group.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{group.category}</p>
                </div>
                <span
                    className={`text-xs font-medium px-3 py-1 rounded-full border ${typeColors[group.type] || "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                >
                    {group.type}
                </span>
            </div>

            {group.description && (
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {group.description}
                </p>
            )}

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-md border ${statusColors[group.status] || "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                >
                    {group.status}
                </span>
                <Users className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
        </Link>
    );
};
