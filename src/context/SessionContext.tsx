"use client";

import React, { createContext, useContext } from "react";
import { useUser } from "../hooks/useUser";

type SessionValue = {
  isLoggedIn: boolean;
};

const SessionContext = createContext<SessionValue>({ isLoggedIn: false });

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const session = useUser();
  return (
    <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionValue {
  return useContext(SessionContext);
}
