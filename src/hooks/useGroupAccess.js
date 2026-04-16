// /src/hooks/useGroupAccess.js

export const useGroupAccess = ({ members, userId }) => {
    const normalizedUserId = String(userId);

    const activeMembers = members?.filter((m) => m.isActive) || [];

    const currentMember = activeMembers.find(
        (m) => String(m.userId?._id) === normalizedUserId
    );

    const isMember = Boolean(currentMember);
    const isAdmin = currentMember?.role === "ADMIN";
    const isModerator = currentMember?.role === "MODERATOR";

    return {
        isMember,
        isAdmin,
        isModerator,
        role: currentMember?.role || null,
    };
};