"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getRuleForPath } from "@/lib/routeAccess";

const RouteGuard = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();

    const token = useSelector((s) => s?.auth?.token);
    const role = useSelector((s) => s?.auth?.role);
    const profileCompleted = useSelector((s) => s?.auth?.profileCompleted); // ✅ NEW
    const hydrated = useSelector((s) => s?.auth?.hydrated);

    const isLoggedIn = Boolean(token);

    useEffect(() => {
        try {
            if (!hydrated) return; // ✅ wait for hydration

            const rule = getRuleForPath(pathname);
            if (!rule) return;

            // ✅ guestOnly pages (auth pages)
            if (rule.guestOnly && isLoggedIn) {
                router.replace(rule.redirectTo || "/");
                return;
            }

            // ✅ requiresAuth pages
            if (rule.requiresAuth && !isLoggedIn) {
                router.replace(rule.redirectTo || "/auth/login");
                return;
            }

            // ✅ roles check
            if (rule.roles?.length) {
                if (!role || !rule.roles.includes(role)) {
                    router.replace(rule.redirectTo || "/");
                    return;
                }
            }

            // ✅ profile completion check
            if (rule.requiresProfile && !profileCompleted) {
                router.replace(rule.redirectTo || "/profile/setup");
                return;
            }
        } catch (e) {
            console.error("RouteGuard error:", e);
        }
    }, [pathname, isLoggedIn, role, profileCompleted, router, hydrated]);

    // ✅ Optional: avoid flash while hydration is happening
    if (!hydrated) return null;

    return <>{children}</>;
};

export default RouteGuard;
