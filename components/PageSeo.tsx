import { useEffect } from "react";
import { Platform } from "react-native";
import { siteUrl } from "@/lib/assets";

type Props = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

export function PageSeo({
  title,
  description,
  path = "/",
  image = "/images/brand/hero-cover.png",
  type = "website",
}: Props) {
  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") return;
    const SITE = siteUrl();
    const fullTitle = title.includes("OSV") ? title : `${title} · OSV`;
    document.title = fullTitle;

    const ensure = (attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const url = `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
    const img = image.startsWith("http") ? image : `${SITE}${image}`;

    ensure("name", "description", description ?? "");
    ensure("property", "og:title", fullTitle);
    ensure("property", "og:description", description ?? "");
    ensure("property", "og:url", url);
    ensure("property", "og:type", type);
    ensure("property", "og:image", img);
    ensure("property", "og:site_name", "OSV");
    ensure("name", "twitter:card", "summary_large_image");
    ensure("name", "twitter:title", fullTitle);
    ensure("name", "twitter:description", description ?? "");
    ensure("name", "twitter:image", img);

    let link = document.head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path, image, type]);

  return null;
}
