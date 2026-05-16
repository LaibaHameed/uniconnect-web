export const EventCardSkeleton = () => (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 h-52 flex flex-col gap-4 animate-pulse">
        <div className="flex gap-2">
            <div className="h-5 w-20 bg-zinc-100 rounded-full" />
            <div className="h-5 w-16 bg-blue-50 rounded-full" />
        </div>
        <div className="flex-1 space-y-3">
            <div className="h-5 bg-zinc-100 rounded w-3/4" />
            <div className="h-4 bg-zinc-100 rounded w-1/2" />
            <div className="h-4 bg-zinc-100 rounded w-2/5" />
        </div>
        <div className="h-px bg-zinc-100" />
        <div className="h-4 bg-zinc-100 rounded w-1/3" />
    </div>
);