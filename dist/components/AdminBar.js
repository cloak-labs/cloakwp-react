"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_primitives_1 = require("@cloakui/react-primitives");
const styles_1 = require("@cloakui/styles");
const useUser_1 = require("../hooks/useUser");
const icons_1 = require("./icons");
const cloakwp_1 = require("cloakwp");
const GlobalsContext_1 = require("../context/GlobalsContext");
const react_1 = require("react");
// TODO: build more of a Composition API for allowing custom menu items + dropdowns etc.
const AdminBar = ({ className, enableRestApiLink = true, alwaysVisible = false, ...props }) => {
    const [cmsMeta, setCmsMeta] = (0, react_1.useState)({ url: null, adminPath: null });
    const { pageData, isPreview } = (0, GlobalsContext_1.useGlobals)();
    let { isLoggedIn = false } = (0, useUser_1.useUser)();
    const { apiRouterBasePath } = (0, cloakwp_1.getCloakWPConfig)();
    (0, react_1.useEffect)(() => {
        const loadCMSInstance = async () => {
            const { url, adminPath } = await (0, cloakwp_1.getCMSInstanceAsync)();
            setCmsMeta({ url, adminPath });
        };
        loadCMSInstance();
    }, []);
    const status = {
        publish: "published",
        draft: "draft",
        pending: "pending",
        future: "scheduled",
        private: "private",
    }[pageData?.status] ??
        pageData?.status ??
        "revision";
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (alwaysVisible || isLoggedIn) && ((0, jsx_runtime_1.jsx)("div", { id: "cloakwp-admin-bar", className: (0, styles_1.cx)("w-full h-[38px] flex items-center bg-root-invert text-root-invert dark:bg-root-dim dark:text-root-dim border-b border-root-dim px-3 lg:px-4 py-1.5", className), ...props, children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex gap-x-2 sm:gap-x-6 mb-0 text-sm", children: [(0, jsx_runtime_1.jsxs)("a", { href: `${cmsMeta.url}${cmsMeta.adminPath}/edit.php`, target: "_blank", className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(icons_1.HomeIcon, { className: "mr-1.5" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:flex", children: "Dashboard" })] }), pageData && ((0, jsx_runtime_1.jsxs)("a", { href: `${cmsMeta.url}${cmsMeta.adminPath}/post.php?post=${pageData.id}&action=edit`, target: "_blank", className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(icons_1.EditIcon, { className: "mr-1.5" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:flex", children: "Edit Page" })] })), enableRestApiLink && ((0, jsx_runtime_1.jsxs)("a", { href: pageData?._links?.self[0]?.href, target: "_blank", className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(icons_1.EyeIcon, { className: "mr-1.5" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:flex", children: "REST API" })] })), isPreview && ((0, jsx_runtime_1.jsx)(react_primitives_1.Button, { variants: { size: "sm", variant: "secondary" }, className: "ml-auto", asChild: true, children: (0, jsx_runtime_1.jsx)(react_primitives_1.Link, { href: `${apiRouterBasePath}/exit-preview?pathname=${pageData.pathname}`, openInNewTab: false, children: "Exit Preview" }) })), pageData && ((0, jsx_runtime_1.jsxs)("div", { className: (0, styles_1.cx)("flex items-center gap-x-2", !isPreview && "ml-auto"), children: ["Status:", (0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-root text-root dark:bg-root-invert dark:text-root-invert py-0.5 px-2 uppercase tracking-normal text-xs font-medium", children: status })] }))] }) })) }));
};
exports.AdminBar = AdminBar;
