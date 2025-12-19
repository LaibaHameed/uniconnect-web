'use client';

import { Provider, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hydrateFromStorage } from './slices/auth/authSlice';
import { makeStore } from './store';

const HydrateAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(hydrateFromStorage());
        } catch (e) {
            console.error("hydrateFromStorage failed:", e);
        }
    }, [dispatch]);

    return null;
};

const Providers = ({ children }) => {
    const storeRef = useRef();

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    useEffect(() => {
        try {
            storeRef.current.dispatch(hydrateFromStorage());
        } catch (error) {
            console.error('Error hydrating auth from storage:', error);
        }
    }, []);

    return (
        <Provider store={storeRef.current}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
        </Provider>
    );
};

export default Providers;
