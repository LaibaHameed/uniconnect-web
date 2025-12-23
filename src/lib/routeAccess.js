export const routeRules = [
  // ✅ logged-in users should not access auth pages
  { prefix: "/auth", rule: { guestOnly: true, redirectTo: "/" } },

  // ✅ profile setup itself should be accessible only after login
  { prefix: "/profile/setup", rule: { requiresAuth: true, redirectTo: "/auth/login" } },

  // ✅ block create group unless profile is completed
  { prefix: "/groups/create", rule: { requiresAuth: true, requiresProfile: true, redirectTo: "/profile/setup" } },

  // ✅ examples for future RBAC
  { prefix: "/admin", rule: { requiresAuth: true, roles: ["SUPER_ADMIN"], redirectTo: "/" } },
  { prefix: "/dashboard", rule: { requiresAuth: true, roles: ["ADMIN", "SUPER_ADMIN"], redirectTo: "/auth/login" } },
];

export const getRuleForPath = (path) => {
  const found = routeRules.find((r) => path.startsWith(r.prefix));
  return found ? found.rule : null;
};
