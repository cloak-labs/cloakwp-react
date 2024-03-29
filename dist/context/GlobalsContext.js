import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
/*
  A fairly generic Global Context utility that allows CloakWP users to wrap their app with <GlobalsProvider>,
  and pass in whatever props they want, which become accessible anywhere in their app via the useGlobals() hook.
  Common use-cases include passing in menu data and ACF Options data.
*/
const GlobalsContext = createContext({});
export const GlobalsProvider = ({ children, ...props }) => {
    return (_jsx(GlobalsContext.Provider, { value: {
            // the values we provide here will be available from the useGlobals hook from anywhere in the app -- gets rid of prop drilling
            ...props, // any data you want, such as ACF Options page data, header/footer data, pageData, etc.
        }, children: children }));
};
export const useGlobals = () => useContext(GlobalsContext);
