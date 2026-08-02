import { Platform } from "react-native";
import Constants from "expo-constants";

function siteOrigin(): string {
  const extra = Constants.expoConfig?.extra as Record<string, string> | undefined;
  return (
    process.env.EXPO_PUBLIC_SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    extra?.EXPO_PUBLIC_SITE_URL ||
    "https://osv.example"
  );
}

/** Resolve site-relative asset paths for native (web can use root-relative). */
export function assetUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  if (Platform.OS === "web") return path;
  const origin = siteOrigin().replace(/\/$/, "");
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteUrl(): string {
  return siteOrigin().replace(/\/$/, "");
}
