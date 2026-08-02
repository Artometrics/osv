#!/usr/bin/env node
/**
 * Parse Hemingway markdown collections into JSON for the Expo app.
 * Also copies author/thumbnail images from src/images → public/images.
 */
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  cpSync,
  existsSync,
} from "node:fs";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/generated");
const CONTENT = join(ROOT, "src/content");

mkdirSync(OUT, { recursive: true });

function listFiles(dir, exts = [".md", ".mdx"]) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => exts.includes(extname(f)))
    .map((f) => join(dir, f));
}

function rewriteAssetUrl(url) {
  if (typeof url !== "string") return url;
  return url
    .replace(/^\/src\/images\//, "/images/")
    .replace(/^\.\.\/\.\.\/images\//, "/images/")
    .replace(/^\/src\//, "/");
}

function normalizeImageField(value) {
  if (!value) return value;
  if (typeof value === "string") return rewriteAssetUrl(value);
  if (typeof value === "object" && value.url) {
    return { ...value, url: rewriteAssetUrl(value.url) };
  }
  return value;
}

function copyDirIfExists(from, to) {
  if (!existsSync(from)) return;
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
}

copyDirIfExists(
  join(ROOT, "src/images/authors"),
  join(ROOT, "public/images/authors"),
);
copyDirIfExists(
  join(ROOT, "src/images/thumbnails"),
  join(ROOT, "public/images/thumbnails"),
);
copyDirIfExists(
  join(ROOT, "src/images/about"),
  join(ROOT, "public/images/about"),
);

// Hemingway uses `posts/`; also accept `blog/` if present.
const postsDir = existsSync(join(CONTENT, "posts"))
  ? join(CONTENT, "posts")
  : join(CONTENT, "blog");

const blog = listFiles(postsDir).map((file) => {
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const id = basename(file, extname(file));
  const slug = data.slug ?? id;
  const image = normalizeImageField(data.image);
  const heroImage =
    typeof image === "object" && image?.url
      ? image.url
      : typeof image === "string"
        ? image
        : rewriteAssetUrl(data.heroImage ?? "");

  return {
    id,
    title: data.title,
    slug,
    pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : null,
    description: data.description ?? "",
    heroImage,
    image,
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author ?? null,
    draft: Boolean(data.draft),
    isRecent: Boolean(data.isRecent),
    isPopular: Boolean(data.isPopular),
    isLocked: Boolean(data.isLocked),
    body: marked.parse(content.trim(), { async: false }),
    bodyFormat: "html",
  };
});

const podcast = listFiles(join(CONTENT, "podcast")).map((file) => {
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const id = basename(file, extname(file));
  const isLocked = Boolean(data.isLocked);
  return {
    id,
    title: data.title,
    pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : null,
    description: data.description ?? "",
    author: data.author ?? "",
    image: normalizeImageField(data.image),
    guestAvatar: normalizeImageField(data.guestAvatar),
    episodeNumber: data.episodeNumber ?? null,
    duration: data.duration ?? null,
    audioSrc: data.audioSrc ?? null,
    tags: data.tags ?? [],
    isRecent: Boolean(data.isRecent),
    isPopular: Boolean(data.isPopular),
    isLocked,
    body: isLocked ? "" : marked.parse(content.trim(), { async: false }),
    bodyFormat: "html",
  };
});

const authors = listFiles(join(CONTENT, "authors"), [".md"]).map((file) => {
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const id = basename(file, extname(file));
  return {
    id,
    name: data.name,
    role: data.role ?? null,
    bio: data.bio ?? content.trim() ?? null,
    image: normalizeImageField(data.image),
    socials: data.socials ?? null,
  };
});

const legal = listFiles(join(CONTENT, "legal"), [".md"]).map((file) => {
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const id = basename(file, extname(file));
  return {
    id,
    page: data.page ?? id,
    pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : null,
    body: marked.parse(content.trim(), { async: false }),
    bodyFormat: "html",
  };
});

writeFileSync(join(OUT, "blog.json"), JSON.stringify(blog, null, 2));
writeFileSync(join(OUT, "podcast.json"), JSON.stringify(podcast, null, 2));
writeFileSync(join(OUT, "authors.json"), JSON.stringify(authors, null, 2));
writeFileSync(join(OUT, "legal.json"), JSON.stringify(legal, null, 2));

const index = {
  blog: blog.length,
  podcast: podcast.length,
  authors: authors.length,
  legal: legal.length,
  generatedAt: new Date().toISOString(),
};
writeFileSync(join(OUT, "index.json"), JSON.stringify(index, null, 2));

const site =
  process.env.EXPO_PUBLIC_SITE_URL ||
  process.env.PUBLIC_SITE_URL ||
  "https://kylesmcauliffe.com";
const rssItems = blog
  .filter((p) => !p.draft && p.pubDate)
  .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
  .map(
    (p) => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${site}/blog/posts/${p.slug}/</link>
      <guid>${site}/blog/posts/${p.slug}/</guid>
      <pubDate>${new Date(p.pubDate).toUTCString()}</pubDate>
      <description><![CDATA[${p.description}]]></description>
    </item>`,
  )
  .join("\n");
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>OSV Magazine</title>
    <link>${site}</link>
    <description>Essays, interviews, and cultural signal</description>
${rssItems}
  </channel>
</rss>
`;
mkdirSync(join(ROOT, "public"), { recursive: true });
writeFileSync(join(ROOT, "public/rss.xml"), rss);

console.log(
  `Content built → src/generated/ (${blog.length} posts, ${podcast.length} podcast, ${authors.length} authors, ${legal.length} legal)`,
);
