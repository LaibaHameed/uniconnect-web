"use client";

import { useEffect, useState } from "react";
import { authStore } from "@/src/lib/authStore";

export const useAuth = () => {
  const [auth, setAuth] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setAuth(authStore.load());
      setReady(true);

      const unsub = authStore.subscribe((state) => setAuth(state));
      return unsub;
    } catch (e) {
      console.error("useAuth init error:", e);
      setReady(true);
    }
  }, []);

  return {
    auth,
    ready,
    isLoggedIn: Boolean(auth?.accessToken),
    role: auth?.user?.role || null,
    profileCompleted: Boolean(auth?.profileCompleted),
  };
};
