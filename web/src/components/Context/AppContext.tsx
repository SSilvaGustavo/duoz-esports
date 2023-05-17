import { ReactNode, createContext, useEffect, useState } from "react";

interface AppContextProps {
  pageLoaded: boolean;
  setPageLoaded: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isAdModalOpen: boolean;
  setIsAdModalOpen: (isAdModalOpen: boolean) => void;
  isDesktop: boolean;
  setIsDesktop: (isDesktop: boolean) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  pageLoaded: false,
  setPageLoaded: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isAdModalOpen: false,
  setIsAdModalOpen: () => {},
  isDesktop: false,
  setIsDesktop: () => {},
  isMobile: false,
  setIsMobile: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(desktopMediaQuery.matches);

    const mobileMediaQuery = window.matchMedia("(min-width: 640px)");
    setIsMobile(mobileMediaQuery.matches);
  }, []);

  return (
    <AppContext.Provider
      value={{
        pageLoaded,
        setPageLoaded,
        isLoading,
        setIsLoading,
        isAdModalOpen,
        setIsAdModalOpen,
        isDesktop,
        setIsDesktop,
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
