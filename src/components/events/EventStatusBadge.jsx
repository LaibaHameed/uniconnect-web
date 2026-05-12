import React from 'react';

export const EventStatusBadge = ({ status }) => {
    const colors = {
        PUBLISHED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        DRAFT: 'bg-amber-50 text-amber-700 border-amber-200',
        CANCELLED: 'bg-red-50 text-red-700 border-red-200',
        COMPLETED: 'bg-blue-50 text-blue-700 border-blue-200',
    };

    const defaultColor = 'bg-zinc-50 text-zinc-700 border-zinc-200';
    const appliedColor = colors[status] || defaultColor;

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${appliedColor}`}>
            {status}
        </span>
    );
};