'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  profileCompleted: false,
  userEmail: null,
  role: null, // ✅ for future RBAC
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      try {
        const payload = action.payload || {};

        // ✅ supports both old and new backend response
        const token = payload.token || payload.accessToken || null;
        const profileCompleted = !!payload.profileCompleted;

        const email =
          payload.email ||
          payload.userEmail ||
          payload.user?.email ||
          null;

        const role = payload.role || payload.user?.role || null;

        state.token = token;
        state.profileCompleted = profileCompleted;
        state.userEmail = email;
        state.role = role;

        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'uniconnect_auth',
            JSON.stringify({ token, profileCompleted, email, role }),
          );
        }
      } catch (error) {
        console.error('Error in setCredentials reducer:', error);
      }
    },

    logout: (state) => {
      try {
        state.token = null;
        state.profileCompleted = false;
        state.userEmail = null;
        state.role = null;

        if (typeof window !== 'undefined') {
          localStorage.removeItem('uniconnect_auth');
        }
      } catch (error) {
        console.error('Error in logout reducer:', error);
      }
    },

    hydrateFromStorage: (state) => {
      try {
        if (typeof window === 'undefined') return;

        const raw = localStorage.getItem('uniconnect_auth');
        if (!raw) return;

        const parsed = JSON.parse(raw);

        state.token = parsed.token || null;
        state.profileCompleted = !!parsed.profileCompleted;
        state.userEmail = parsed.email || null;
        state.role = parsed.role || null;
      } catch (error) {
        console.error('Error hydrating auth state:', error);
      }
    },
  },
});

export const { setCredentials, logout, hydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;
