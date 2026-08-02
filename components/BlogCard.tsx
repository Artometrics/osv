import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { assetUrl } from "@/lib/assets";
import {
  formatAuthorName,
  formatDate,
  type BlogPost,
} from "@/lib/content";

export function BlogCard({
  post,
  variant = "row",
}: {
  post: BlogPost;
  variant?: "stack" | "row" | "cover";
}) {
  const hero = assetUrl(post.heroImage);
  const author = post.author
    ? formatAuthorName(String(post.author))
    : "Staff";
  const tag = post.tags?.[0];
  const href = `/blog/posts/${post.slug}` as const;

  if (variant === "cover") {
    return (
      <Link href={href} asChild>
        <Pressable className="relative min-h-[420px] w-full overflow-hidden border-2 border-border bg-black">
          {hero ? (
            <Image
              source={{ uri: hero }}
              className="absolute inset-0 h-full w-full"
              contentFit="cover"
              transition={200}
            />
          ) : null}
          <View className="absolute inset-0 bg-black/35" />
          <View className="absolute inset-0 justify-end gap-2 p-5">
            {tag ? (
              <Text className="font-[Anton] text-[12px] uppercase tracking-[2px] text-accent">
                {tag}
              </Text>
            ) : null}
            <Text className="font-[Anton] text-4xl uppercase leading-[0.95] tracking-[1px] text-white">
              {post.title}
            </Text>
            <Text className="text-[11px] uppercase tracking-[1.4px] text-white/70">
              {author} · {formatDate(post.pubDate)}
            </Text>
          </View>
        </Pressable>
      </Link>
    );
  }

  if (variant === "stack") {
    return (
      <Link href={href} asChild>
        <Pressable className="min-w-[260px] flex-1 gap-3 overflow-hidden border-2 border-border pb-0">
          {hero ? (
            <Image
              source={{ uri: hero }}
              className="aspect-[4/5] w-full"
              contentFit="cover"
              transition={200}
              accessibilityLabel={post.title}
            />
          ) : (
            <View className="aspect-[4/5] w-full bg-accent" />
          )}
          <View className="gap-2 p-3">
            {tag ? (
              <Text className="font-[Anton] text-[11px] uppercase tracking-[2px] text-accent">
                {tag}
              </Text>
            ) : null}
            <Text className="font-[Anton] text-[22px] uppercase leading-6 tracking-[1px] text-fg">
              {post.title}
            </Text>
            <Text
              className="font-sans text-[14px] leading-[20px] text-muted"
              numberOfLines={3}
            >
              {post.description}
            </Text>
          </View>
        </Pressable>
      </Link>
    );
  }

  return (
    <Link href={href} asChild>
      <Pressable className="flex-row items-stretch gap-0 border-b-2 border-border">
        <View className="flex-1 justify-center gap-1.5 py-5 pr-4">
          {tag ? (
            <Text className="font-[Anton] text-[11px] uppercase tracking-[2px] text-accent">
              {tag}
            </Text>
          ) : null}
          <Text className="font-[Anton] text-2xl uppercase leading-7 tracking-[1px] text-fg">
            {post.title}
          </Text>
          <Text
            className="font-sans text-[14px] leading-[20px] text-muted"
            numberOfLines={2}
          >
            {post.description}
          </Text>
          <Text className="mt-1 text-[11px] uppercase tracking-[1.2px] text-subtle">
            {formatDate(post.pubDate)}
          </Text>
        </View>
        {hero ? (
          <Image
            source={{ uri: hero }}
            className="h-[120px] w-[100px]"
            contentFit="cover"
            transition={200}
            accessibilityLabel={post.title}
          />
        ) : (
          <View className="h-[120px] w-[100px] bg-accent" />
        )}
      </Pressable>
    </Link>
  );
}
