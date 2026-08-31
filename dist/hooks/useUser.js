"use client";
import { useEffect, useState } from "react";
import { hasSessionHint } from "cloakwp/auth";
export function useUser() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        setIsLoggedIn(hasSessionHint(document.cookie));
    }, []);
    return {
        isLoggedIn,
    };
}
