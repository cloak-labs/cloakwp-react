import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ErrorPage({ errorData }) {
    return (_jsx("div", { className: "px-4 sm:px-6 lg:px-9 mx-auto max-w-7xl lg:max-w-8xl", children: _jsxs("div", { className: "mx-auto flex h-[70vh] max-w-none flex-col items-center justify-center gap-y-3 sm:max-w-xl lg:max-w-3xl", children: [_jsx("h2", { className: "text-lg text-gray-900 sm:text-xl", children: errorData?.data?.status
                        ? `${errorData.data.status} error`
                        : `Unknown error` }), _jsx("h1", { className: "text-4xl mb-5 text-gray-700 sm:text-5xl", children: "Sorry, an error occured." }), _jsx("p", { children: errorData?.code && `Code: ${errorData.code}` }), _jsx("p", { children: errorData?.code && `Message: ${errorData.message}` })] }) }));
}
