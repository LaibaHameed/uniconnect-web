import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, selectEventFilters } from '@/redux/slices/events/eventsSlice';

export const useEventFilters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const filters = useSelector(selectEventFilters);

    const updateUrlAndRedux = useCallback((newFilters) => {
        // 1. Update Redux
        dispatch(setFilters(newFilters));

        // 2. Sync with URL
        const params = new URLSearchParams(searchParams);

        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [dispatch, pathname, router, searchParams]);

    const handleFilterChange = (key, value) => {
        updateUrlAndRedux({ ...filters, [key]: value });
    };

    const resetFilters = () => {
        updateUrlAndRedux({
            search: '',
            status: '',
            mode: '',
            eventType: '',
            upcoming: 'true',
        });
    };

    return {
        filters,
        handleFilterChange,
        resetFilters,
    };
};