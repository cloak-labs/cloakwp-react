import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
export const LogoutForm = forwardRef(function LogoutForm({ action = "/api/cloakwp/auth/logout", redirect = "/", className, children = "Log Out", }, ref) {
    return (_jsxs("form", { ref: ref, method: "POST", action: action, className: className, children: [_jsx("input", { type: "hidden", name: "redirect", value: redirect }), _jsx("button", { type: "submit", children: children })] }));
});
