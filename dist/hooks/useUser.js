"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = void 0;
const react_1 = require("react");
const cloakwp_1 = require("cloakwp");
function useUser() {
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        (0, cloakwp_1.isUserLoggedIn)().then((loginStatus) => setIsLoggedIn(loginStatus));
    }, []);
    return {
        isLoggedIn,
        // in future add other WP user data here if a WordPress admin user is logged in
    };
}
exports.useUser = useUser;
