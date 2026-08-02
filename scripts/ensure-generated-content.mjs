#!/usr/bin/env node
/**
 * Rebuild src/generated/* from markdown before Expo/EAS bundles the app.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(script) {
  console.log(`[ensure-content] npm run ${script}`);
  const res = spawnSync("npm", ["run", script], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });
  if (res.status !== 0) {
    process.exit(res.status ?? 1);
  }
}

run("content");

const blogPath = join(ROOT, "src/generated/blog.json");
if (!existsSync(blogPath)) {
  console.error("[ensure-content] missing src/generated/blog.json after content build");
  process.exit(1);
}

const posts = JSON.parse(readFileSync(blogPath, "utf8"));
const slugs = new Set(posts.map((p) => p.slug));
const contentDir = existsSync(join(ROOT, "src/content/posts"))
  ? join(ROOT, "src/content/posts")
  : join(ROOT, "src/content/blog");
const mdSlugs = readdirSync(contentDir)
  .filter((f) => extname(f) === ".md" || extname(f) === ".mdx")
  .map((f) => basename(f, extname(f)));

const missing = mdSlugs.filter((s) => !slugs.has(s));
if (missing.length) {
  console.error(
    "[ensure-content] markdown posts missing from blog.json:",
    missing.join(", "),
  );
  process.exit(1);
}

console.log(
  `[ensure-content] ok — ${posts.length} posts in blog.json (matched ${mdSlugs.length} markdown files)`,
);
