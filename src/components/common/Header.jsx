"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Building2, Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { HEADER_ACTIONS, HEADER_NAV_ITEMS } from "../constants/layout";
import Link from "next/link";
import { logout } from "@/redux/slices/auth/authSlice";

const Header = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const token = useSelector((s) => s?.auth?.token);
    const userEmail = useSelector((s) => s?.auth?.userEmail);

    const isLoggedIn = Boolean(token);

    const handleToggleMenu = () => {
        try {
            setOpen((prev) => !prev);
        } catch (error) {
            console.error("Error toggling mobile menu:", error);
        }
    };

    const handleNavigate = (href) => {
        try {
            setOpen(false);
            router.push(href);
        } catch (error) {
            console.error("Navigation error:", error);
        }
    };

    const handleLogout = () => {
        try {
            dispatch(logout());
            setOpen(false);
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const loginAction = HEADER_ACTIONS.login;
    const signupAction = HEADER_ACTIONS.signup;

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-emerald-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 sm:py-4">
                    {/* Logo + title */}
                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3" onClick={() => setOpen(false)}>
                        <div className="bg-linear-to-br from-emerald-600 to-blue-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-2xl font-bold bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                UniConnect
                            </h1>
                            <p className="text-xs text-gray-500 hidden sm:block">UAF Campus Hub</p>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {HEADER_NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleNavigate(item.href)}
                                className={`text-gray-700 hover:text-emerald-600 font-medium transition ${pathname === item.href ? "text-emerald-600" : ""
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Actions - Consistent across all devices */}
                    <div className="flex items-center space-x-3">
                        {isLoggedIn ? (
                            <>
                                <button
                                    type="button"
                                    className="hidden lg:block px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition"
                                    onClick={() => handleNavigate("/profile")}
                                    title={userEmail || "Account"}
                                >
                                    {userEmail ? userEmail : "Account"}
                                </button>

                                <button
                                    type="button"
                                    className="hidden lg:block px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {loginAction && (
                                    <button
                                        type="button"
                                        className="hidden lg:block px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium transition"
                                        onClick={() => handleNavigate(loginAction.href)}
                                    >
                                        {loginAction.label}
                                    </button>
                                )}

                                {signupAction && (
                                    <button
                                        type="button"
                                        className="hidden lg:block px-5 py-2 bg-linear-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5 font-medium"
                                        onClick={() => handleNavigate(signupAction.href)}
                                    >
                                        {signupAction.label}
                                    </button>
                                )}
                            </>
                        )}

                        {/* Mobile menu icon */}
                        <button
                            type="button"
                            onClick={handleToggleMenu}
                            className="lg:hidden p-2 text-gray-700 hover:text-emerald-600"
                            aria-label="Toggle menu"
                        >
                            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {open && <MobileMenu onNavigate={handleNavigate} onLogout={handleLogout} />}
            </div>
        </header>
    );
};

export default Header;