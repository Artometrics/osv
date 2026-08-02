import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { PodcastCard } from "@/components/PodcastCard";
import { PageSeo } from "@/components/PageSeo";
import { LoopVideo } from "@/components/LoopVideo";
import { getRecentEpisodes, getRecentPosts } from "@/lib/content";

const HERO = "/images/brand/hero-cover.png";
const HERO_VIDEO = "/videos/brand/hero-cover.mp4";
const STRIP = "/images/brand/portrait-blood.png";
const STRIP_VIDEO = "/videos/brand/portrait-blood.mp4";

const GALLERY = [
  {
    src: "/images/brand/armor-lamb.png",
    video: "/videos/brand/armor-lamb.mp4",
    label: "Mercy",
  },
  {
    src: "/images/brand/black-cat.png",
    video: "/videos/brand/black-cat.mp4",
    label: "Omen",
  },
  {
    src: "/images/brand/dark-knight.png",
    video: "/videos/brand/dark-knight.mp4",
    label: "Iron",
  },
  {
    src: "/images/brand/gothic-tower.png",
    video: "/videos/brand/gothic-tower.mp4",
    label: "Spire",
  },
  {
    src: "/images/brand/hero-pier.png",
    video: "/videos/brand/hero-pier.mp4",
    label: "Fog",
  },
  {
    src: "/images/brand/battlefield-banners.png",
    video: "/videos/brand/battlefield-banners.mp4",
    label: "Field",
  },
  {
    src: "/images/brand/anime-chrome-nun.png",
    video: "/videos/brand/anime-chrome-nun.mp4",
    label: "Chrome",
  },
  {
    src: "/images/brand/anime-red-liquid.png",
    video: "/videos/brand/anime-red-liquid.mp4",
    label: "Flood",
  },
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

      {/* Full-bleed hero with looping motion */}
      <View className="relative min-h-[92vh] w-full overflow-hidden bg-black">
        <LoopVideo
          src={HERO_VIDEO}
          poster={HERO}
          className="absolute inset-0 h-full w-full"
          lazy={false}
        />
        <View className="absolute inset-0 bg-black/50" />
        <View className="osv-scanlines absolute inset-0" />
        <Wrapper className="relative z-10 min-h-[92vh] justify-end gap-4 pb-14 pt-24">
          <Text className="osv-fade-up font-[UnifrakturCook] text-5xl text-accent md:text-6xl">
            osv
          </Text>
          <Text className="osv-fade-up osv-fade-up-delay max-w-[16ch] font-[Anton] text-5xl uppercase leading-[0.9] tracking-[1px] text-white md:text-7xl">
            Soft things in hard places
          </Text>
          <Text className="osv-fade-up osv-fade-up-delay-2 max-w-[34ch] font-sans text-[15px] leading-6 text-white/75">
            Essays and interviews cut from fog, iron, and omen — a dark gothic
            magazine for culture that stares back.
          </Text>
          <View className="osv-fade-up osv-fade-up-delay-3 mt-2 flex-row flex-wrap gap-3">
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

      {/* Blood / omen strip — drifting loop */}
      <View className="relative h-[200px] w-full overflow-hidden border-y-2 border-border bg-black md:h-[280px]">
        <LoopVideo
          src={STRIP_VIDEO}
          poster={STRIP}
          className="absolute inset-0 h-full w-full"
          mediaClassName="opacity-70"
        />
        <View className="absolute inset-0 bg-accent/25" />
        <View className="absolute inset-0 items-center justify-center px-4">
          <Text className="osv-glitch text-center font-[Anton] text-4xl uppercase tracking-[8px] text-white md:text-6xl">
            Heart outwards
          </Text>
        </View>
      </View>

      {/* Fog band between strip and lookbook */}
      <View className="relative h-[140px] w-full overflow-hidden border-b-2 border-border bg-black md:h-[180px]">
        <LoopVideo
          src="/videos/brand/gothic-tower.mp4"
          poster="/images/brand/gothic-tower.png"
          className="absolute inset-0 h-full w-full"
          mediaClassName="opacity-55"
        />
        <View className="absolute inset-0 bg-black/40" />
        <View className="absolute inset-0 items-center justify-center">
          <Text className="font-[Anton] text-2xl uppercase tracking-[6px] text-white/90 md:text-4xl">
            Moving signal
          </Text>
        </View>
      </View>

      {/* Visual gallery — looping lookbook */}
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
                <LoopVideo
                  src={item.video}
                  poster={item.src}
                  className="absolute inset-0 h-full w-full"
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

      {/* Podcast rail with ambient pier loop */}
      <View className="relative border-t-2 border-border bg-black py-10">
        <LoopVideo
          src="/videos/brand/hero-pier.mp4"
          poster="/images/brand/hero-pier.png"
          className="absolute inset-0 h-full w-full"
          mediaClassName="opacity-25"
        />
        <Wrapper className="relative z-10 gap-4">
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
          <View className="border-2 border-white bg-black/70">
            {episodes.map((ep) => (
              <View key={ep.id} className="bg-transparent">
                <PodcastCard episode={ep} />
              </View>
            ))}
          </View>
        </Wrapper>
      </View>
    </>
  );
}
