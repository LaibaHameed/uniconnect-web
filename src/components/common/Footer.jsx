import { Building2, Mail } from "lucide-react";
import {
    FOOTER_QUICK_LINKS,
    FOOTER_SUPPORT_LINKS,
} from "../constants/layout"; // adjust path

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 sm:py-10 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* Brand block */}
                    <div>
                        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                            <div className="bg-linear-to-br from-emerald-600 to-blue-600 p-1.5 sm:p-2 rounded-lg">
                                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold">UniConnect</span>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm">
                            Connecting students with societies and opportunities at UAF
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                            Quick Links
                        </h4>
                        <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                            {FOOTER_QUICK_LINKS.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={item.href}
                                        className="hover:text-emerald-400 transition"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support links */}
                    <div>
                        <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                            Support
                        </h4>
                        <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                            {FOOTER_SUPPORT_LINKS.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={item.href}
                                        className="hover:text-emerald-400 transition"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                            Stay Updated
                        </h4>
                        <div className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm"
                            />
                            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition">
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
                    <p>&copy; 2025 UniConnect - UAF. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
