const JoinButton = ({ isAdmin, isMember, hasPendingRequest, joining, cancelling, onJoin, onCancel }) => {
    if (isAdmin) return null;

    if (isMember) {
        return (
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-2.5 rounded-xl text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Member
            </div>
        );
    }

    if (hasPendingRequest) {
        return (
            <button
                onClick={onCancel}
                disabled={cancelling}
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
            >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {cancelling ? "Cancelling…" : "Request Pending — Cancel"}
            </button>
        );
    }

    return (
        <button
            onClick={onJoin}
            disabled={joining}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
        >
            {joining ? "Processing…" : "Join Group"}
        </button>
    );
};

export default JoinButton;