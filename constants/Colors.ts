/**
 * OSV brand tokens — dark gothic crimson / black / white zine.
 */

export const Colors = {
  red: "#E60000",
  redDeep: "#B80000",
  redSoft: "#FF1A1A",
  black: "#000000",
  white: "#FFFFFF",
  paper: "#F4F4F4",
  ash: "#1A1A1A",
  mute: "#8A8A8A",
} as const;

export type BrandFonts = {
  display: string;
  gothic: string;
  script: string;
  sans: string;
  mono: string;
};

export const Fonts: BrandFonts = {
  display: "Anton",
  gothic: "UnifrakturCook",
  script: "GreatVibes",
  sans: "Inter",
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
};

export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  mode: ThemeMode;
  bg: string;
  bgElevated: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  border: string;
  accent: string;
  accentSoft: string;
  inverse: string;
  headerBg: string;
  overlayBg: string;
  rule: string;
};

/** Default site theme locks to the zine light paper + red/black system. */
export const Themes: Record<ThemeMode, ThemeColors> = {
  light: {
    mode: "light",
    bg: Colors.white,
    bgElevated: Colors.paper,
    text: Colors.black,
    textMuted: "#333333",
    textSubtle: Colors.mute,
    border: Colors.black,
    accent: Colors.red,
    accentSoft: "#FFE5E5",
    inverse: Colors.white,
    headerBg: Colors.white,
    overlayBg: Colors.white,
    rule: Colors.black,
  },
  dark: {
    mode: "dark",
    bg: Colors.black,
    bgElevated: Colors.ash,
    text: Colors.white,
    textMuted: "#C8C8C8",
    textSubtle: Colors.mute,
    border: Colors.white,
    accent: Colors.red,
    accentSoft: "#3A0000",
    inverse: Colors.black,
    headerBg: Colors.black,
    overlayBg: Colors.ash,
    rule: Colors.white,
  },
};

export function resolveThemeColors(mode: ThemeMode): ThemeColors {
  return Themes[mode];
}
