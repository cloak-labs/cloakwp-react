import { createContext, useContext } from "react";

/*
  A fairly generic Global Context utility that allows CloakWP users to wrap their app with <GlobalsProvider>, 
  and pass in whatever props they want, which become accessible anywhere in their app via the useGlobals() hook.
  Common use-cases include passing in menu data and site-wide globals
  (company details, default layout, social links — content every page might need).
*/

const GlobalsContext = createContext({} as any);

export const GlobalsProvider = ({ children, ...props }) => {
  return (
    <GlobalsContext.Provider
      value={{
        // the values we provide here will be available from the useGlobals hook from anywhere in the app -- gets rid of prop drilling
        ...(props as any), // any data you want, such as site-wide globals, header/footer menus, pageData, etc.
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export const useGlobals = <T extends Record<string, any>>() =>
  useContext(GlobalsContext) as T;
