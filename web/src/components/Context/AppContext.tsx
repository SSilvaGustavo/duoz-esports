import { ReactNode, createContext, useEffect, useState } from "react";

interface AppContextProps {
  pageLoaded: boolean;
  setPageLoaded: (value: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  pageLoaded: false,
  setPageLoaded: () => {},
});

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [pageLoaded, setPageLoaded] = useState(false);

  return (
    <AppContext.Provider value={{ pageLoaded, setPageLoaded }}>
      {children}
    </AppContext.Provider>
  );
}
