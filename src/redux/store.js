'use client';

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import authReducer from './slices/auth/authSlice';

export const makeStore = () => {
  try {
    return configureStore({
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
      devTools: process.env.NODE_ENV !== 'production',
    });
  } catch (error) {
    console.error('Error creating Redux store:', error);
    throw error;
  }
};
