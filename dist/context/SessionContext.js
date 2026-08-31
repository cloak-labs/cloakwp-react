"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { useUser } from "../hooks/useUser";
const SessionContext = createContext({ isLoggedIn: false });
export function SessionProvider({ children }) {
    const session = useUser();
    return (_jsx(SessionContext.Provider, { value: session, children: children }));
}
export function useSession() {
    return useContext(SessionContext);
}
