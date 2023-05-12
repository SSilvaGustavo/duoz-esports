import { ReactNode, createContext, useState } from "react";

interface AppContextProps {
  pageLoaded: boolean;
  setPageLoaded: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isAdModalOpen: boolean;
  setIsAdModalOpen: (isAdModalOpen: boolean) => void
}

export const AppContext = createContext<AppContextProps>({
  pageLoaded: false,
  setPageLoaded: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isAdModalOpen: false,
  setIsAdModalOpen: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  return (
    <AppContext.Provider value={{ pageLoaded, setPageLoaded, isLoading, setIsLoading, isAdModalOpen, setIsAdModalOpen }}>
      {children}
    </AppContext.Provider>
  );
}
