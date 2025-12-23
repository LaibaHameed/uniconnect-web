"use client";

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { useGetGroupsQuery } from "@/redux/slices/groups/groupsApi";

const FeaturedSocieties = () => {
    const { data, isLoading, isError, error } = useGetGroupsQuery({
        // type: "SOCIETY",
        status: "APPROVED",
    });

    const societies = Array.isArray(data) ? data.slice(0, 4) : [];

    const errMsg =
        error?.data?.message ||
        error?.error ||
        "Failed to load featured societies";

    return (
        <section id="societies" className="py-16 bg-linear-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between mb-10 gap-4">
                    <div>
                        <h3 className="text-4xl font-bold">Featured Societies</h3>
                        <p className="text-gray-600">Join active communities and grow your network</p>
                    </div>

                    <Link
                        href="/groups"
                        className="px-6 py-3 text-emerald-600 hover:text-emerald-700 font-semibold flex items-center space-x-2 group"
                    >
                        <span>View All</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                    </Link>
                </div>

                {isLoading && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                                <div className="h-6 w-24 bg-gray-200 rounded mb-4" />
                                <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
                                <div className="h-4 w-28 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="bg-white border border-red-200 text-red-700 p-4 rounded-xl">
                        {errMsg}
                    </div>
                )}

                {!isLoading && !isError && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {societies.map((soc) => (
                            <Link
                                key={soc._id}
                                href={`/groups/${soc._id}`}
                                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition cursor-pointer group block"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-blue-400 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                        {(soc.name?.[0] || "S").toUpperCase()}
                                    </div>

                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                                        {soc.category || "General"}
                                    </span>
                                </div>

                                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition">
                                    {soc.name}
                                </h4>

                                <div className="flex items-center text-gray-600 text-sm">
                                    <Users className="w-4 h-4 mr-2" />
                                    {/* if backend not sending membersCount yet, fallback */}
                                    {typeof soc.membersCount === "number" ? soc.membersCount : "20"} members
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedSocieties;
