import { Users, ArrowRight } from "lucide-react";
import { FEATURED_SOCIETIES } from "../constants/homeData";

const FeaturedSocieties = () => {
    return (
        <section id="societies" className="py-16 bg-linear-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">

                <div className="flex flex-col sm:flex-row justify-between mb-10">
                    <div>
                        <h3 className="text-4xl font-bold">Featured Societies</h3>
                        <p className="text-gray-600">Join active communities and grow your network</p>
                    </div>

                    <button className="px-6 py-3 cursor-pointer text-emerald-600 hover:text-emerald-700 font-semibold flex items-center space-x-2 group">
                        <span>View All</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURED_SOCIETIES.map((soc, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition cursor-pointer group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-blue-400 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                    {soc.name[0]}
                                </div>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                                    {soc.category}
                                </span>
                            </div>

                            <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition">
                                {soc.name}
                            </h4>

                            <div className="flex items-center text-gray-600 text-sm">
                                <Users className="w-4 h-4 mr-2" />
                                {soc.members} members
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSocieties;
