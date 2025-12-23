export const LoadingSkeleton = () => {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse"
                >
                    <div className="mb-4">
                        <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
                        <div className="flex gap-2">
                            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                            <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                    <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};