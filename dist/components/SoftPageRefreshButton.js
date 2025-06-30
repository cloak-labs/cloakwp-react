import { jsx as _jsx } from "react/jsx-runtime";
import { RefreshIcon } from "./icons/RefreshIcon";
import { cx } from "@cloakui/styles";
export const SoftPageRefreshButton = ({ isRefreshing, onClick, className, ...props }) => {
    return (_jsx("div", { className: cx("fixed bottom-3 right-2 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-root-invert p-1.5 text-root-invert shadow-md hover:bg-root-invert/80", className), onClick: onClick, ...props, children: _jsx(RefreshIcon, { className: ["pointer-events-none", isRefreshing && "animate-spin"] }) }));
};
