export const PaginationControls = ({ page, totalPages, onPrev, onNext }) => (
    <div className="flex justify-center items-center gap-4 pt-6 border-t border-zinc-200">
        <button
            disabled={page <= 1}
            onClick={onPrev}
            className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
        >
            Previous
        </button>
        <span className="text-sm font-medium text-zinc-500">
            Page {page} of {totalPages}
        </span>
        <button
            disabled={page >= totalPages}
            onClick={onNext}
            className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
        >
            Next
        </button>
    </div>
);