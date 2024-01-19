"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobals = exports.GlobalsProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/*
  A fairly generic Global Context utility that allows CloakWP users to wrap their app with <GlobalsProvider>,
  and pass in whatever props they want, which become accessible anywhere in their app via the useGlobals() hook.
  Common use-cases include passing in menu data and ACF Options data.
*/
const GlobalsContext = (0, react_1.createContext)({});
const GlobalsProvider = ({ children, ...props }) => {
    return ((0, jsx_runtime_1.jsx)(GlobalsContext.Provider, { value: {
            // the values we provide here will be available from the useGlobals hook from anywhere in the app -- gets rid of prop drilling
            ...props, // any data you want, such as ACF Options page data, header/footer data, pageData, etc.
        }, children: children }));
};
exports.GlobalsProvider = GlobalsProvider;
const useGlobals = () => (0, react_1.useContext)(GlobalsContext);
exports.useGlobals = useGlobals;
