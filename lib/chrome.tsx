import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ChromeContextValue = {
  scrollY: number;
  setScrollY: (y: number) => void;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

const defaultChrome: ChromeContextValue = {
  scrollY: 0,
  setScrollY: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
};

const ChromeContext = createContext<ChromeContextValue>(defaultChrome);

export function ChromeProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollYState] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const setScrollY = useCallback((y: number) => {
    setScrollYState((prev) => (Math.abs(prev - y) < 8 ? prev : y));
  }, []);

  const value = useMemo(
    () => ({
      scrollY,
      setScrollY,
      menuOpen,
      setMenuOpen,
    }),
    [scrollY, setScrollY, menuOpen],
  );

  return (
    <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>
  );
}

export function useChrome() {
  return useContext(ChromeContext);
}
