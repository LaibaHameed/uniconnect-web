export const EventDetailSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
        <div className="h-64 md:h-80 bg-gray-100" />
        <div className="p-8 md:p-12 space-y-6">

            {/* Badges */}
            <div className="flex gap-2">
                <div className="h-6 w-20 bg-gray-100 rounded-full" />
                <div className="h-6 w-24 bg-gray-100 rounded-full" />
                <div className="h-6 w-16 bg-gray-100 rounded-full" />
            </div>

            {/* Title */}
            <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />

            {/* Quick Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                    <div className="space-y-2 flex-1">
                        <div className="h-3 w-16 bg-gray-200 rounded" />
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                        <div className="h-3 w-28 bg-gray-100 rounded" />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                    <div className="space-y-2 flex-1">
                        <div className="h-3 w-16 bg-gray-200 rounded" />
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>

            {/* Contact row */}
            <div className="flex gap-4">
                <div className="h-10 w-32 bg-gray-100 rounded-lg" />
                <div className="h-10 w-32 bg-gray-100 rounded-lg" />
                <div className="h-10 w-32 bg-gray-100 rounded-lg" />
            </div>

            {/* Description lines */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-4/6" />
                <div className="h-4 bg-gray-100 rounded w-3/4" />
            </div>

            {/* Tags */}
            <div className="flex gap-2">
                <div className="h-7 w-16 bg-gray-100 rounded-lg" />
                <div className="h-7 w-20 bg-gray-100 rounded-lg" />
                <div className="h-7 w-14 bg-gray-100 rounded-lg" />
            </div>

            {/* Footer */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
                <div className="h-4 w-40 bg-gray-100 rounded" />
                <div className="h-10 w-32 bg-gray-200 rounded-lg" />
            </div>

        </div>
    </div>
);