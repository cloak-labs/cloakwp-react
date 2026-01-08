import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { Link } from "@cloakui/react-primitives/Link";
import { Button } from "@cloakui/react-primitives/Button";
import { HomeIcon, EditIcon, EyeIcon, DoubleChevronIcon } from "./icons";
import { getCloakWPConfig } from "cloakwp";
import { ContentSourceRegistry } from "cloakwp/cms";
import { useGlobals } from "../context/GlobalsContext";
import { useUser } from "../hooks/useUser";
import { cx } from "@cloakui/styles";
// TODO: build more of a Composition API for allowing custom menu items + dropdowns etc.
export const AdminBar = ({ className, enableRestApiLink = true, alwaysVisible = false, ...props }) => {
    // const [cmsMeta, setCmsMeta] = useState({ url: null, adminPath: null });
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const { pageData, isPreview } = useGlobals();
    const { isLoggedIn = false } = useUser();
    const { apiRouterBasePath } = getCloakWPConfig();
    const wp = ContentSourceRegistry.get("wp");
    const { url, adminPath } = wp.getConfig();
    const status = {
        publish: "published",
        draft: "draft",
        pending: "pending",
        future: "scheduled",
        private: "private",
    }[pageData?.status] ?? "unknown";
    return (_jsx(_Fragment, { children: (alwaysVisible || isLoggedIn) && (_jsxs("div", { id: "cloakwp-admin-bar", className: cx("relative h-[38px] z-[101] flex items-center dark text-root-dim border-b border-root py-1.5", isCollapsed
                ? "w-auto absolute right-0 top-3 border-l border-t rounded-l-sm bg-root/30 backdrop-blur-sm transition-all duration-100"
                : "w-full px-3 bg-root", className), ...props, children: [!isCollapsed && (_jsxs("div", { className: "flex w-full gap-x-2 sm:gap-x-6 mb-0 text-sm", children: [_jsxs("a", { href: `${url}${adminPath}/edit.php`, target: "_blank", className: "flex items-center", children: [_jsx(HomeIcon, { className: "mr-1.5" }), _jsx("span", { className: "hidden sm:flex", children: "Dashboard" })] }), pageData && (_jsxs("a", { href: `${url}${adminPath}/post.php?post=${pageData.id}&action=edit`, target: "_blank", className: "flex items-center", children: [_jsx(EditIcon, { className: "mr-1.5" }), _jsx("span", { className: "hidden sm:flex", children: "Edit Page" })] })), enableRestApiLink && (_jsxs("a", { href: pageData?._links?.self[0]?.href, target: "_blank", className: "flex items-center", children: [_jsx(EyeIcon, { className: "mr-1.5" }), _jsx("span", { className: "hidden sm:flex", children: "REST API" })] })), isPreview && (_jsx(Button, { variants: { size: "sm", variant: "secondary" }, className: "ml-auto", asChild: true, children: _jsx(Link, { href: `${apiRouterBasePath}/exit-preview?pathname=${pageData.pathname}`, openInNewTab: false, children: "Exit Preview" }) })), pageData && (_jsxs("div", { className: cx("flex items-center gap-x-2 text-sm", !isPreview && "ml-auto"), children: ["Status:", _jsx("span", { className: "rounded-full bg-root text-root dark:bg-root-invert dark:text-root-invert py-0.5 px-2 uppercase tracking-normal text-xs font-medium", children: status })] })), _jsx("div", { className: "absolute right-9 top-0 w-px h-full bg-root-invert-dim/20" })] })), _jsx(DoubleChevronIcon, { className: [
                        "border-root cursor-pointer transition-all duration-200",
                        isCollapsed ? "px-1 size-6" : "size-4 rotate-180 ml-6",
                    ], onClick: () => setIsCollapsed(!isCollapsed) })] })) }));
};
