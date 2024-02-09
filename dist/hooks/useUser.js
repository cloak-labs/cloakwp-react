import { useEffect, useState } from "react";
import { isUserLoggedIn } from "cloakwp/auth";
export function useUser() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        isUserLoggedIn().then((loginStatus) => setIsLoggedIn(loginStatus));
    }, []);
    return {
        isLoggedIn,
        // in future add other WP user data here if a WordPress admin user is logged in
    };
}
