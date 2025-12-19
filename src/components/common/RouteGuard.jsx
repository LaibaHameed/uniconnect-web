'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getRuleForPath } from '@/lib/routeAccess';

const RouteGuard = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();

    const token = useSelector((s) => s?.auth?.token);
    const role = useSelector((s) => s?.auth?.role);

    const isLoggedIn = Boolean(token);

    useEffect(() => {
        try {
            const rule = getRuleForPath(pathname);
            if (!rule) return;

            // ✅ guest-only routes (auth pages)
            if (rule.guestOnly && isLoggedIn) {
                router.replace(rule.redirectTo || '/');
                return;
            }

            // ✅ protected routes
            if (rule.requiresAuth && !isLoggedIn) {
                router.replace(rule.redirectTo || '/auth/login');
                return;
            }

            // ✅ role-based routes
            if (rule.roles?.length) {
                if (!role || !rule.roles.includes(role)) {
                    router.replace('/');
                    return;
                }
            }
        } catch (e) {
            console.error('RouteGuard error:', e);
        }
    }, [pathname, isLoggedIn, role, router]);

    return <>{children}</>;
};

export default RouteGuard;
