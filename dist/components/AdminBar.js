import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getCloakWPConfig } from "cloakwp";
import { getCMSInstanceAsync } from "cloakwp/cms";
import { Link } from "@cloakui/react-primitives/Link";
import { Button } from "@cloakui/react-primitives/Button";
import { cx } from "@cloakui/styles";
import { useUser } from "../hooks/useUser";
import { HomeIcon, EditIcon, EyeIcon } from "./icons";
import { useGlobals } from "../context/GlobalsContext";
// TODO: build more of a Composition API for allowing custom menu items + dropdowns etc.
export const AdminBar = ({ className, enableRestApiLink = true, alwaysVisible = false, ...props }) => {
    const [cmsMeta, setCmsMeta] = useState({ url: null, adminPath: null });
    const { pageData, isPreview } = useGlobals();
    const { isLoggedIn = false } = useUser();
    const { apiRouterBasePath } = getCloakWPConfig();
    useEffect(() => {
        const loadCMSInstance = async () => {
            const { url, adminPath } = await getCMSInstanceAsync();
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
    }[pageData?.status] ?? "unknown";
    return (_jsx(_Fragment, { children: (alwaysVisible || isLoggedIn) && (_jsx("div", { id: "cloakwp-admin-bar", className: cx("w-full h-[38px] flex items-center dark bg-root text-root-dim border-b border-root px-3 lg:px-4 py-1.5", className), ...props, children: _jsxs("div", { className: "w-full flex gap-x-2 sm:gap-x-6 mb-0 text-sm", children: [_jsxs("a", { href: `${cmsMeta.url}${cmsMeta.adminPath}/edit.php`, target: "_blank", className: "flex items-center", children: [_jsx(HomeIcon, { className: "mr-1.5" }), _jsx("span", { className: "hidden sm:flex", children: "Dashboard" })] }), pageData && (_jsxs("a", { href: `${cmsMeta.url}${cmsMeta.adminPath}/post.php?post=${pageData.id}&action=edit`, target: "_blank", className: "flex items-center", children: [_jsx(EditIcon, { className: "mr-1.5" }), _jsx("span", { className: "hidden sm:flex", children: "Edit Page" })] })), enableRestApiLink && (_jsxs("a", { href: pageData?._links?.self[0]?.href, target: "_blank", className: "flex items-center", children: [_jsx(EyeIcon, { className: "mr-1.5" }), _jsx("span", { className: "hidden sm:flex", children: "REST API" })] })), isPreview && (_jsx(Button, { variants: { size: "sm", variant: "secondary" }, className: "ml-auto", asChild: true, children: _jsx(Link, { href: `${apiRouterBasePath}/exit-preview?pathname=${pageData.pathname}`, openInNewTab: false, children: "Exit Preview" }) })), pageData && (_jsxs("div", { className: cx("flex items-center gap-x-2", !isPreview && "ml-auto"), children: ["Status:", _jsx("span", { className: "rounded-full bg-root text-root dark:bg-root-invert dark:text-root-invert py-0.5 px-2 uppercase tracking-normal text-xs font-medium", children: status })] }))] }) })) }));
};
