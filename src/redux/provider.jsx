"use client";

import { Provider } from "react-redux";
import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { hydrateFromStorage } from "./slices/auth/authSlice";
import { makeStore } from "./store";

const Providers = ({ children }) => {
    const storeRef = useRef(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    useEffect(() => {
        try {
            storeRef.current.dispatch(hydrateFromStorage());
        } catch (e) {
            console.error("Error hydrating auth from storage:", e);
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
