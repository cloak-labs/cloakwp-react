"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
function ErrorPage({ errorData }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "px-4 sm:px-6 lg:px-9 mx-auto max-w-7xl lg:max-w-8xl", children: (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto flex h-[70vh] max-w-none flex-col items-center justify-center gap-y-3 sm:max-w-xl lg:max-w-3xl", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg text-gray-900 sm:text-xl", children: errorData?.data?.status
                        ? `${errorData.data.status} error`
                        : `Unknown error` }), (0, jsx_runtime_1.jsx)("h1", { className: "text-4xl mb-5 text-gray-700 sm:text-5xl", children: "Sorry, an error occured." }), (0, jsx_runtime_1.jsx)("p", { children: errorData?.code && `Code: ${errorData.code}` }), (0, jsx_runtime_1.jsx)("p", { children: errorData?.code && `Message: ${errorData.message}` })] }) }));
}
exports.ErrorPage = ErrorPage;
