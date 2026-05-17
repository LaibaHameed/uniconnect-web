import { Shield, User, Crown, Trash2, MoreVertical, ShieldCheck, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useUpdateMemberRoleMutation, useRemoveMemberMutation } from "@/redux/slices/groups/groupsApi";
import { toast } from "react-hot-toast"; // Recommended for feedback

export const MemberCard = ({ member, isAdmin, currentUserId, groupId }) => {
    const [showActions, setShowActions] = useState(false);

    const [updateRole, { isLoading: isUpdating }] = useUpdateMemberRoleMutation();
    const [removeMember, { isLoading: isRemoving }] = useRemoveMemberMutation();

    // Edge Case: Don't show actions for yourself
    const isMe = member.user?._id === currentUserId || member.userId?._id === currentUserId;

    const roleConfig = {
        ADMIN: { icon: Crown, className: "bg-purple-100 text-purple-700 border-purple-200" },
        MODERATOR: { icon: Shield, className: "bg-blue-100 text-blue-700 border-blue-200" },
        MEMBER: { icon: User, className: "bg-gray-100 text-gray-700 border-gray-200" },
    };

    const config = roleConfig[member.role] || roleConfig.MEMBER;
    const RoleIcon = config.icon;

    const handleRoleChange = async (newRole) => {
        try {
            await updateRole({ groupId, userId: member.user?._id || member.userId?._id, role: newRole }).unwrap();
            toast.success(`Role updated to ${newRole}`);
            setShowActions(false);
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update role");
        }
    };

    const handleRemove = async () => {
        if (!window.confirm(`Are you sure you want to remove ${member.fullName}?`)) return;
        try {
            await removeMember({ groupId, userId: member.user?._id || member.userId?._id }).unwrap();
            toast.success("Member removed successfully");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to remove member");
        }
    };

    return (
        <li className="relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                        <span className="text-white font-semibold text-sm">
                            {(member.fullName || "U").charAt(0).toUpperCase()}
                        </span>
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                            {member.fullName} {isMe && <span className="text-xs font-normal text-gray-400 ml-1">(You)</span>}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{member.email}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${config.className}`}>
                        <RoleIcon className="w-3.5 h-3.5" />
                        {member.role}
                    </span>

                    {/* Admin Specific Actions */}
                    {isAdmin && !isMe && (
                        <div className="relative">
                            <button
                                onClick={() => setShowActions(!showActions)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                            >
                                <MoreVertical className="w-5 h-5 text-gray-400" />
                            </button>

                            {showActions && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 animate-in fade-in zoom-in duration-100">
                                    {member.role !== "MODERATOR" && (
                                        <button
                                            onClick={() => handleRoleChange("MODERATOR")}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                        >
                                            <ShieldCheck className="w-4 h-4 text-blue-600" /> Promote to Moderator
                                        </button>
                                    )}
                                    {member.role !== "MEMBER" && (
                                        <button
                                            onClick={() => handleRoleChange("MEMBER")}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <ShieldAlert className="w-4 h-4 text-orange-600" /> Demote to Member
                                        </button>
                                    )}
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                        onClick={handleRemove}
                                        disabled={isRemoving}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" /> {isRemoving ? "Removing..." : "Remove from Group"}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};