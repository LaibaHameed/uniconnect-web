export const LoadingState = () => {
    return (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="mt-3 space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                        <div className="h-5 bg-gray-200 rounded w-20"></div>
                        <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};