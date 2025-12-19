export const routeRules = [
  // ✅ logged-in users should not access auth pages
  { prefix: '/auth', rule: { guestOnly: true, redirectTo: '/' } },

  // ✅ examples for future RBAC
  { prefix: '/admin', rule: { requiresAuth: true, roles: ['SUPER_ADMIN'], redirectTo: '/auth/login' } },
  { prefix: '/dashboard', rule: { requiresAuth: true, roles: ['SOCIETY_ADMIN', 'SUPER_ADMIN'], redirectTo: '/auth/login' } },
];

export const getRuleForPath = (path) => {
  const found = routeRules.find((r) => path.startsWith(r.prefix));
  return found ? found.rule : null;
};
