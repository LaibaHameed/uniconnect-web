export const LOCALE = 'en-PK';

export function formatEventDate(iso) {
    const d = new Date(iso);
    return {
        date: d.toLocaleDateString(LOCALE, { month: 'short', day: 'numeric', year: 'numeric' }),
        time: d.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' }),
    };
}

export function humanize(str) {
    return str?.replace(/_/g, ' ') ?? '';
}