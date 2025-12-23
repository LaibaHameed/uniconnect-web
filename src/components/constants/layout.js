// src/constants/layout.js

// ======================
// Header navigation
// ======================

const HEADER_NAV_ITEMS_MAP = {
    societies: {
        id: 'societies',
        label: 'Societies',
        href: '/groups',
    },
    events: {
        id: 'events',
        label: 'Events',
        href: '#events',
    },
    about: {
        id: 'about',
        label: 'About',
        href: '/about',
    },
};

export const HEADER_NAV_ITEMS = Object.values(HEADER_NAV_ITEMS_MAP);

// If later you need “Login / Sign up” to be dynamic, you can add here too:
export const HEADER_ACTIONS = {
    login: { id: 'login', label: 'Login', href: '/auth/login' },
    signup: { id: 'register', label: 'Register', href: '/auth/register' },
};

// Mobile-only extra links (like login anchor)
const HEADER_MOBILE_EXTRA_MAP = {
    login: { id: 'login', label: 'Login', href: '#login' },
};

export const HEADER_MOBILE_EXTRA_LINKS = Object.values(
    HEADER_MOBILE_EXTRA_MAP,
);

// ======================
// Footer links
// ======================

const FOOTER_QUICK_LINKS_MAP = {
    aboutUs: { id: 'about-us', label: 'About Us', href: '#' },
    societies: { id: 'societies', label: 'Societies', href: '#' },
    events: { id: 'events', label: 'Events', href: '#' },
    contact: { id: 'contact', label: 'Contact', href: '#' },
};

export const FOOTER_QUICK_LINKS = Object.values(FOOTER_QUICK_LINKS_MAP);

const FOOTER_SUPPORT_LINKS_MAP = {
    helpCenter: { id: 'help-center', label: 'Help Center', href: '#' },
    privacyPolicy: {
        id: 'privacy-policy',
        label: 'Privacy Policy',
        href: '#',
    },
    terms: {
        id: 'terms-of-service',
        label: 'Terms of Service',
        href: '#',
    },
};

export const FOOTER_SUPPORT_LINKS = Object.values(FOOTER_SUPPORT_LINKS_MAP);
