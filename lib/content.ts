import blogData from "@/src/generated/blog.json";
import podcastData from "@/src/generated/podcast.json";
import authorsData from "@/src/generated/authors.json";
import legalData from "@/src/generated/legal.json";

export type BlogPost = (typeof blogData)[number];
export type PodcastEpisode = (typeof podcastData)[number];
export type Author = (typeof authorsData)[number];
export type LegalPage = (typeof legalData)[number];

export function formatAuthorName(slug: string) {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getBlogPosts(): BlogPost[] {
  return (blogData as BlogPost[])
    .filter((post) => !post.draft && post.pubDate)
    .sort(
      (a, b) =>
        new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime(),
    );
}

export function getBlogPost(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  return getBlogPosts().find((p) => p.slug === slug || p.id === slug);
}

export function getPodcastEpisodes(): PodcastEpisode[] {
  return (podcastData as PodcastEpisode[])
    .filter((ep) => ep.pubDate)
    .sort(
      (a, b) =>
        new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime(),
    );
}

export function getPodcastEpisode(
  id: string | undefined,
): PodcastEpisode | undefined {
  if (!id) return undefined;
  return (podcastData as PodcastEpisode[]).find((ep) => ep.id === id);
}

export function getAuthors(): Author[] {
  return authorsData as Author[];
}

export function getAuthor(id: string | undefined): Author | undefined {
  if (!id) return undefined;
  return (authorsData as Author[]).find((a) => a.id === id);
}

export function getLegalPages(): LegalPage[] {
  return legalData as LegalPage[];
}

export function getLegalPage(id: string | undefined): LegalPage | undefined {
  if (!id) return undefined;
  return (legalData as LegalPage[]).find((p) => p.id === id);
}

export function getAdjacentPosts(currentSlug: string) {
  const sorted = getBlogPosts();
  const index = sorted.findIndex(
    (p) => p.slug === currentSlug || p.id === currentSlug,
  );
  if (index === -1) return { previous: null, next: null };
  const previous = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;
  return {
    previous: previous
      ? { title: previous.title, href: `/blog/posts/${previous.slug}` }
      : null,
    next: next
      ? { title: next.title, href: `/blog/posts/${next.slug}` }
      : null,
  };
}

export function getRecentPosts(limit = 4): BlogPost[] {
  const all = getBlogPosts();
  const recent = all.filter((p) => p.isRecent);
  return (recent.length ? recent : all).slice(0, limit);
}

export function getPopularPosts(limit = 4): BlogPost[] {
  const all = getBlogPosts();
  const popular = all.filter((p) => p.isPopular);
  return (popular.length ? popular : all).slice(0, limit);
}

export function getRecentEpisodes(limit = 4): PodcastEpisode[] {
  const all = getPodcastEpisodes();
  const recent = all.filter((e) => e.isRecent);
  return (recent.length ? recent : all).slice(0, limit);
}
