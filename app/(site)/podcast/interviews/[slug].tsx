import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { PageSeo } from "@/components/PageSeo";
import { assetUrl } from "@/lib/assets";
import {
  formatDate,
  getPodcastEpisode,
  getPodcastEpisodes,
} from "@/lib/content";
import { paramString } from "@/lib/params";

export async function generateStaticParams() {
  return getPodcastEpisodes().map((ep) => ({ slug: ep.id }));
}

export default function PodcastEpisodeScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const episode = getPodcastEpisode(slug);

  if (!episode) {
    return (
      <Wrapper className="gap-3 py-10">
        <Text className="font-serif text-[36px] font-light text-fg">
          Episode not found
        </Text>
        <Link href="/podcast">
          <Text className="text-accent">Back to podcast</Text>
        </Link>
      </Wrapper>
    );
  }

  const cover = assetUrl(
    typeof episode.image === "object" && episode.image?.url
      ? episode.image.url
      : typeof episode.image === "string"
        ? episode.image
        : undefined,
  );

  return (
    <>
      <PageSeo
        title={episode.title}
        description={episode.description}
        path={`/podcast/interviews/${episode.id}`}
        image={
          typeof episode.image === "object" ? episode.image?.url : undefined
        }
        type="article"
      />
      <Wrapper variant="prose" className="gap-4 py-10">
        {episode.episodeNumber != null ? (
          <Text className="text-xs font-medium uppercase tracking-[1.8px] text-accent">
            Episode {episode.episodeNumber}
            {episode.duration ? ` · ${episode.duration}` : ""}
          </Text>
        ) : null}
        <Text className="font-serif text-4xl font-light leading-tight text-fg">
          {episode.title}
        </Text>
        <Text className="font-sans text-base leading-6 text-muted">
          {episode.description}
        </Text>
        <Text className="text-xs text-subtle">
          {formatDate(episode.pubDate)}
          {episode.isLocked ? " · Members" : ""}
        </Text>
        {cover ? (
          <Image
            source={{ uri: cover }}
            className="mt-2 aspect-square w-full max-w-[320px]"
            contentFit="cover"
            transition={200}
            accessibilityLabel={episode.title}
          />
        ) : null}
        {episode.audioSrc && !episode.isLocked ? (
          <View className="mt-2 border border-border p-4">
            <Text className="mb-2 text-xs uppercase tracking-wide text-subtle">
              Audio
            </Text>
            <Text className="font-sans text-sm text-muted">{episode.audioSrc}</Text>
          </View>
        ) : null}
        {episode.body ? (
          <View className="mt-4">
            <ArticleBody html={episode.body} />
          </View>
        ) : episode.isLocked ? (
          <Text className="mt-4 font-sans text-base text-muted">
            Full transcript available to members.{" "}
            <Link href="/pricing">
              <Text className="text-accent">View membership →</Text>
            </Link>
          </Text>
        ) : null}
      </Wrapper>
    </>
  );
}
