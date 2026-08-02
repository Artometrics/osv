import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { assetUrl } from "@/lib/assets";
import { formatDate, type PodcastEpisode } from "@/lib/content";

export function PodcastCard({ episode }: { episode: PodcastEpisode }) {
  const cover =
    assetUrl(
      typeof episode.image === "object" && episode.image?.url
        ? episode.image.url
        : typeof episode.image === "string"
          ? episode.image
          : undefined,
    ) ?? undefined;
  const href = `/podcast/interviews/${episode.id}` as const;

  return (
    <Link href={href} asChild>
      <Pressable className="flex-row items-stretch gap-0 border-b-2 border-border">
        {cover ? (
          <Image
            source={{ uri: cover }}
            className="h-[110px] w-[110px]"
            contentFit="cover"
            transition={200}
            accessibilityLabel={episode.title}
          />
        ) : (
          <View className="h-[110px] w-[110px] bg-accent" />
        )}
        <View className="flex-1 justify-center gap-1 px-4 py-4">
          {episode.episodeNumber != null ? (
            <Text className="font-[Anton] text-[11px] uppercase tracking-[2px] text-accent">
              Ep {episode.episodeNumber}
              {episode.duration ? ` · ${episode.duration}` : ""}
            </Text>
          ) : null}
          <Text className="font-[Anton] text-xl uppercase leading-6 tracking-[1px] text-fg">
            {episode.title}
          </Text>
          <Text
            className="font-sans text-[14px] leading-[20px] text-muted"
            numberOfLines={2}
          >
            {episode.description}
          </Text>
          <Text className="text-[11px] uppercase tracking-[1.2px] text-subtle">
            {formatDate(episode.pubDate)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
