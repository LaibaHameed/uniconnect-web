'use client';
import { Search, X } from 'lucide-react';
import { useEventFilters } from '@/hooks/useEventFilters';
import { EventType, EventMode } from '@/validations/event.validation';

export const EventFilters = () => {
    const { filters, handleFilterChange, resetFilters } = useEventFilters();

    const inputClasses = "bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all text-zinc-800";

    return (
        <div className="bg-zinc-100/50 border border-zinc-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center mb-8">
            {/* Search */}
            <div className="relative flex-1 w-full">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    value={filters.search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className={`${inputClasses} w-full pl-10`}
                />
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto">
                <select 
                    value={filters.eventType || ''} 
                    onChange={(e) => handleFilterChange('eventType', e.target.value)}
                    className={inputClasses}
                >
                    <option value="">All Categories</option>
                    {EventType.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <select 
                    value={filters.mode || ''} 
                    onChange={(e) => handleFilterChange('mode', e.target.value)}
                    className={inputClasses}
                >
                    <option value="">All Modes</option>
                    {EventMode.map(m => <option key={m} value={m}>{m.replace('_', ' ')}</option>)}
                </select>

                {/* Upcoming Toggle */}
                <label className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm cursor-pointer hover:bg-zinc-50 transition-colors">
                    <input 
                        type="checkbox" 
                        checked={filters.upcoming === 'true'}
                        onChange={(e) => handleFilterChange('upcoming', e.target.checked ? 'true' : '')}
                        className="w-4 h-4 text-blue-600 rounded border-zinc-300 focus:ring-blue-600"
                    />
                    <span className="font-medium text-zinc-700">Upcoming Only</span>
                </label>

                {/* Reset */}
                {(filters.search || filters.eventType || filters.mode) && (
                    <button 
                        onClick={resetFilters}
                        className="flex items-center justify-center p-2.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        title="Clear Filters"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};