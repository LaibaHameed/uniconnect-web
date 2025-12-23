"use client";
import { Sparkles, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            <span>Your Campus, Connected</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Discover, Join &
                            <span className="bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                {" "}Engage
                            </span>
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Connect with student societies, stay updated on events, and never miss an opportunity.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="px-8 py-4 cursor-pointer bg-linear-to-r from-emerald-600 to-blue-600 text-white rounded-xl hover:shadow-xl transition flex items-center space-x-2">
                                <Link href={'/groups'}>Explore Societies</Link>
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button className="px-8 py-4 cursor-pointer bg-white border-2 border-gray-200 hover:border-emerald-600 text-gray-700 rounded-xl transition">
                                View Events
                            </button>
                        </div>
                    </div>

                    {/* Right card */}
                    <div className="relative mt-8 md:mt-0">
                        <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-blue-400 rounded-2xl transform rotate-3 opacity-20"></div>

                        <div className="relative bg-white rounded-2xl shadow-2xl p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Quick Search</h3>
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>

                            <input
                                type="text"
                                placeholder="Search societies or events..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition"
                            />

                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-gray-500 uppercase">Popular Searches</p>
                                <div className="flex flex-wrap gap-2">
                                    {["Hackathon", "Debate", "Sports", "Workshop", "Seminar"].map(tag => (
                                        <span key={tag} className="px-4 py-2 bg-linear-to-r from-emerald-50 to-blue-50 text-emerald-700 rounded-lg text-sm font-medium hover:shadow-md transition cursor-pointer">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
