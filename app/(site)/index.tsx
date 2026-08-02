import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { PodcastCard } from "@/components/PodcastCard";
import { PageSeo } from "@/components/PageSeo";
import { getRecentEpisodes, getRecentPosts } from "@/lib/content";

const HERO = "/images/brand/hero-cover.png";
const STRIP = "/images/brand/portrait-blood.png";

const GALLERY = [
  { src: "/images/brand/armor-lamb.png", label: "Mercy" },
  { src: "/images/brand/black-cat.png", label: "Omen" },
  { src: "/images/brand/dark-knight.png", label: "Iron" },
  { src: "/images/brand/gothic-tower.png", label: "Spire" },
  { src: "/images/brand/hero-pier.png", label: "Fog" },
  { src: "/images/brand/battlefield-banners.png", label: "Field" },
  { src: "/images/brand/anime-chrome-nun.png", label: "Chrome" },
  { src: "/images/brand/anime-red-liquid.png", label: "Flood" },
] as const;

export default function HomeScreen() {
  const posts = getRecentPosts(4);
  const episodes = getRecentEpisodes(3);
  const cover = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <PageSeo
        title="OSV"
        description="Dark gothic magazine — essays, interviews, and cultural signal."
        path="/"
        image={HERO}
      />

      {/* Full-bleed hero */}
      <View className="relative min-h-[92vh] w-full overflow-hidden bg-black">
        <Image
          source={{ uri: HERO }}
          className="absolute inset-0 h-full w-full"
          contentFit="cover"
          transition={280}
        />
        <View className="absolute inset-0 bg-black/50" />
        <Wrapper className="relative z-10 min-h-[92vh] justify-end gap-4 pb-14 pt-24">
          <Text className="font-[UnifrakturCook] text-5xl text-accent md:text-6xl">
            osv
          </Text>
          <Text className="max-w-[16ch] font-[Anton] text-5xl uppercase leading-[0.9] tracking-[1px] text-white md:text-7xl">
            Soft things in hard places
          </Text>
          <Text className="max-w-[34ch] font-sans text-[15px] leading-6 text-white/75">
            Essays and interviews cut from fog, iron, and omen — a dark gothic
            magazine for culture that stares back.
          </Text>
          <View className="mt-2 flex-row flex-wrap gap-3">
            <Link href="/blog" asChild>
              <Pressable className="bg-accent px-5 py-3">
                <Text className="font-[Anton] text-[13px] uppercase tracking-[2px] text-white">
                  Enter the issue
                </Text>
              </Pressable>
            </Link>
            <Link href="/podcast" asChild>
              <Pressable className="border-2 border-white px-5 py-3">
                <Text className="font-[Anton] text-[13px] uppercase tracking-[2px] text-white">
                  Listen
                </Text>
              </Pressable>
            </Link>
          </View>
        </Wrapper>
      </View>

      {/* Blood / omen strip */}
      <View className="relative h-[200px] w-full overflow-hidden border-y-2 border-border bg-black md:h-[280px]">
        <Image
          source={{ uri: STRIP }}
          className="absolute inset-0 h-full w-full opacity-70"
          contentFit="cover"
        />
        <View className="absolute inset-0 bg-accent/25" />
        <View className="absolute inset-0 items-center justify-center px-4">
          <Text className="text-center font-[Anton] text-4xl uppercase tracking-[8px] text-white md:text-6xl">
            Heart outwards
          </Text>
        </View>
      </View>

      {/* Visual gallery — Instagram-grid energy */}
      <View className="border-b-2 border-border bg-black py-10">
        <Wrapper className="gap-5">
          <View className="flex-row items-end justify-between gap-4">
            <View>
              <Text className="font-[GreatVibes] text-3xl text-accent">
                Still frames
              </Text>
              <Text className="font-[Anton] text-4xl uppercase tracking-[2px] text-white">
                The lookbook
              </Text>
            </View>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {GALLERY.map((item) => (
              <View
                key={item.src}
                className="relative aspect-[3/4] min-w-[46%] flex-1 overflow-hidden border border-white/20 md:min-w-[22%]"
              >
                <Image
                  source={{ uri: item.src }}
                  className="absolute inset-0 h-full w-full"
                  contentFit="cover"
                  transition={200}
                />
                <View className="absolute bottom-0 left-0 right-0 bg-black/55 px-2 py-1.5">
                  <Text className="font-[Anton] text-[11px] uppercase tracking-[2px] text-white">
                    {item.label}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Wrapper>
      </View>

      {/* Cover story + stack */}
      <Wrapper className="gap-6 py-10">
        <View className="flex-row items-end justify-between gap-4">
          <View>
            <Text className="font-[GreatVibes] text-3xl text-accent">
              Issue
            </Text>
            <Text className="font-[Anton] text-4xl uppercase tracking-[2px] text-fg">
              From the magazine
            </Text>
          </View>
          <Link href="/blog" asChild>
            <Pressable>
              <Text className="font-[Anton] text-[12px] uppercase tracking-[2px] text-accent">
                Archive →
              </Text>
            </Pressable>
          </Link>
        </View>

        {cover ? <BlogCard post={cover} variant="cover" /> : null}

        <View className="flex-row flex-wrap gap-4">
          {rest.map((post) => (
            <View key={post.slug} className="min-w-[260px] flex-1">
              <BlogCard post={post} variant="stack" />
            </View>
          ))}
        </View>
      </Wrapper>

      {/* Podcast rail */}
      <View className="border-t-2 border-border bg-black py-10">
        <Wrapper className="gap-4">
          <View className="flex-row items-end justify-between">
            <Text className="font-[Anton] text-4xl uppercase tracking-[2px] text-white">
              Interviews
            </Text>
            <Link href="/podcast" asChild>
              <Pressable>
                <Text className="font-[Anton] text-[12px] uppercase tracking-[2px] text-accent">
                  All episodes →
                </Text>
              </Pressable>
            </Link>
          </View>
          <View className="border-2 border-white">
            {episodes.map((ep) => (
              <View key={ep.id} className="bg-black">
                <PodcastCard episode={ep} />
              </View>
            ))}
          </View>
        </Wrapper>
      </View>
    </>
  );
}
