import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Appearance, Platform } from "react-native";
import { Uniwind } from "uniwind";
import {
  Fonts,
  resolveThemeColors,
  type ThemeColors,
  type ThemeMode,
} from "@/constants/Colors";

type Preference = ThemeMode | "system";

type ThemeContextValue = {
  preference: Preference;
  mode: ThemeMode;
  colors: ThemeColors;
  fonts: typeof Fonts;
  setPreference: (p: Preference) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "osv-theme";

function systemMode(): ThemeMode {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return Appearance.getColorScheme() === "dark" ? "dark" : "light";
}

function readStored(): Preference | null {
  if (Platform.OS !== "web" || typeof localStorage === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
  } catch {
    /* ignore */
  }
  return null;
}

function writeStored(p: Preference) {
  if (Platform.OS !== "web" || typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, p);
  } catch {
    /* ignore */
  }
}

function applyDomTheme(mode: ThemeMode, colors: ThemeColors) {
  try {
    Appearance.setColorScheme?.(mode);
  } catch {
    /* older runtimes */
  }
  if (Platform.OS !== "web" || typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.style.setProperty("color-scheme", mode);
  root.style.backgroundColor = colors.bg;
  document.body.style.backgroundColor = colors.bg;
  document.body.style.color = colors.text;
  const appRoot = document.getElementById("root");
  if (appRoot) {
    appRoot.style.backgroundColor = colors.bg;
    appRoot.style.color = colors.text;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<Preference>(
    () => readStored() ?? "dark",
  );
  const [system, setSystem] = useState<ThemeMode>(() => systemMode());

  useEffect(() => {
    setSystem(systemMode());
    if (Platform.OS === "web" && typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => setSystem(mq.matches ? "dark" : "light");
      mq.addEventListener?.("change", onChange);
      return () => mq.removeEventListener?.("change", onChange);
    }
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystem(colorScheme === "dark" ? "dark" : "light");
    });
    return () => sub.remove();
  }, []);

  const setPreference = useCallback((p: Preference) => {
    setPreferenceState(p);
    writeStored(p);
  }, []);

  const mode: ThemeMode = preference === "system" ? system : preference;

  const toggle = useCallback(() => {
    setPreference(mode === "dark" ? "light" : "dark");
  }, [mode, setPreference]);

  const colors = useMemo(() => resolveThemeColors(mode), [mode]);

  useEffect(() => {
    Uniwind.setTheme(preference === "system" ? "system" : preference);
    applyDomTheme(mode, colors);
  }, [preference, mode, colors]);

  const value = useMemo(
    () => ({
      preference,
      mode,
      colors,
      fonts: Fonts,
      setPreference,
      toggle,
    }),
    [preference, mode, colors, setPreference, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      preference: "light" as Preference,
      mode: "light" as ThemeMode,
      colors: resolveThemeColors("light"),
      fonts: Fonts,
      setPreference: () => {},
      toggle: () => {},
    };
  }
  return ctx;
}
