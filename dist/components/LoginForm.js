import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function LoginForm({ strategy = "credentials", action = "/api/cloakwp/auth/authorize", redirect = "/", className, }) {
    if (strategy === "redirect") {
        return (_jsxs("p", { children: ["Redirect login is not implemented yet. Use", " ", _jsx("code", { children: "strategy=\"credentials\"" }), "."] }));
    }
    return (_jsxs("form", { method: "POST", action: action, className: className, children: [_jsx("input", { type: "hidden", name: "grant_type", value: "password" }), _jsx("input", { type: "hidden", name: "redirect", value: redirect }), _jsxs("div", { children: [_jsx("label", { htmlFor: "cloakwp-username", children: "Username" }), _jsx("input", { id: "cloakwp-username", name: "username", type: "text", autoComplete: "username", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "cloakwp-password", children: "Password" }), _jsx("input", { id: "cloakwp-password", name: "password", type: "password", autoComplete: "current-password", required: true })] }), _jsx("button", { type: "submit", children: "Sign in" })] }));
}
