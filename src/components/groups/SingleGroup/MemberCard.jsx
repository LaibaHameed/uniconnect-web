import {
    Shield,
    User,
    Crown,
} from "lucide-react";

export const MemberCard = ({ member }) => {
    const roleConfig = {
        ADMIN: {
            icon: Crown,
            className: "bg-purple-100 text-purple-700 border-purple-200",
        },
        MODERATOR: {
            icon: Shield,
            className: "bg-blue-100 text-blue-700 border-blue-200",
        },
        MEMBER: {
            icon: User,
            className: "bg-gray-100 text-gray-700 border-gray-200",
        },
    };

    const config = roleConfig[member.role] || roleConfig.MEMBER;
    const RoleIcon = config.icon;

    console.log(member);

    return (
        <li className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                        <span className="text-white font-semibold text-sm">
                            {member.userId?.name?.charAt(0).toUpperCase() || "?"}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                            {member.userId?.name || "Unknown User"}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {member.userId?.email || "No email"}
                        </p>
                    </div>
                </div>
                <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border shrink-0 ${config.className}`}
                >
                    <RoleIcon className="w-3.5 h-3.5" />
                    {member.role}
                </span>
            </div>
        </li>
    );
};