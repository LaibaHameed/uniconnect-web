// ErrorState Component
import {
    ArrowLeft,
    AlertCircle
} from "lucide-react";
import Link from "next/link";

export const ErrorState = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Group Not Found
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            The group you're looking for doesn't exist or has been removed.
                        </p>
                        <Link
                            href="/groups"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Groups
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};