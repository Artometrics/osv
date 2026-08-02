import { useMemo, useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Instagram, Linkedin, Music2, Youtube } from "lucide-react-native";
import { PageSeo } from "@/components/PageSeo";
import { bio, type BioSocial } from "@/data/bio";
import { assetUrl } from "@/lib/assets";
import { getRecentEpisodes, getRecentPosts } from "@/lib/content";

type FeedTab = "magazine" | "podcast";

const HERO = "/images/brand/hero-cover.png";

function openHref(href: string, external?: boolean) {
  if (external || /^https?:\/\//i.test(href)) {
    void Linking.openURL(href);
    return;
  }
  router.push(href as `/`);
}

function SocialIcon({ id, color }: { id: BioSocial["id"]; color: string }) {
  const size = 22;
  switch (id) {
    case "instagram":
      return <Instagram size={size} color={color} strokeWidth={1.5} />;
    case "x":
      return <Text style={{ color, fontSize: 16, fontWeight: "700" }}>𝕏</Text>;
    case "tiktok":
      return <Music2 size={size} color={color} strokeWidth={1.5} />;
    case "youtube":
      return <Youtube size={size} color={color} strokeWidth={1.5} />;
    case "linkedin":
      return <Linkedin size={size} color={color} strokeWidth={1.5} />;
    default:
      return null;
  }
}

function BioLinkButton({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <Pressable
      onPress={() => openHref(href, external)}
      accessibilityRole="link"
      accessibilityLabel={label}
      className="w-full border-2 border-white bg-black px-4 py-4 active:bg-accent"
    >
      <Text className="text-center font-[Anton] text-[14px] uppercase tracking-[2px] text-white">
        {label}
      </Text>
    </Pressable>
  );
}

export default function BioScreen() {
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState<FeedTab>("magazine");
  const posts = useMemo(() => getRecentPosts(9), []);
  const episodes = useMemo(() => getRecentEpisodes(9), []);

  const gap = 2;
  const maxW = Math.min(width, 480);
  const cell = (maxW - gap * 2) / 3;

  const feed =
    tab === "magazine"
      ? posts.map((p) => ({
          key: p.slug,
          title: p.title,
          image: assetUrl(p.heroImage),
          href: `/blog/posts/${p.slug}`,
        }))
      : episodes.map((e) => ({
          key: e.id,
          title: e.title,
          image: assetUrl(
            typeof e.image === "object" && e.image?.url
              ? e.image.url
              : typeof e.image === "string"
                ? e.image
                : undefined,
          ),
          href: `/podcast/interviews/${e.id}`,
        }));

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-black" edges={["top", "bottom"]}>
        <StatusBar style="light" />
        <PageSeo
          title="OSV · Links"
          description="Magazine, podcast, membership, and socials — OSV link in bio."
          path="/bio"
          image={HERO}
        />

        <ScrollView
          className="flex-1 bg-black"
          contentContainerClassName="items-center grow"
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full px-5 pb-12 pt-8" style={{ maxWidth: 480 }}>
            <View className="items-center gap-3">
              <Image
                source={{ uri: HERO }}
                className="mb-2 h-28 w-28 border-2 border-white"
                contentFit="cover"
              />
              <Text className="font-[UnifrakturCook] text-5xl text-accent">
                osv
              </Text>
              <Text className="font-[Anton] text-[40px] uppercase tracking-[3px] text-white">
                {bio.brand}
              </Text>
              <Text className="text-[11px] uppercase tracking-[2px] text-white/55">
                {bio.tagline}
              </Text>
            </View>

            <View className="mt-6 flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {bio.handles.map((handle) => (
                <Pressable
                  key={handle.label}
                  onPress={() => openHref(handle.href, true)}
                >
                  <Text className="text-[12px] text-white/80">
                    {handle.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View className="mt-6 flex-row items-center justify-center gap-5">
              {bio.socials.map((social) => (
                <Pressable
                  key={social.id}
                  onPress={() => openHref(social.href, true)}
                  accessibilityLabel={social.label}
                  className="h-10 w-10 items-center justify-center"
                >
                  <SocialIcon id={social.id} color="#FFFFFF" />
                </Pressable>
              ))}
            </View>

            <View className="mt-8 gap-3">
              {bio.ctas.map((cta) => (
                <BioLinkButton
                  key={cta.label}
                  label={cta.label}
                  href={cta.href}
                  external={cta.external}
                />
              ))}
            </View>

            <View className="mt-10 flex-row border-b border-white/25">
              {(
                [
                  ["magazine", "Magazine"],
                  ["podcast", "Podcast"],
                ] as const
              ).map(([id, label]) => {
                const active = tab === id;
                return (
                  <Pressable
                    key={id}
                    onPress={() => setTab(id)}
                    className="flex-1 items-center pb-3"
                    style={{
                      borderBottomWidth: active ? 3 : 0,
                      borderBottomColor: "#E60000",
                    }}
                  >
                    <Text
                      className={`font-[Anton] text-[13px] uppercase tracking-[2px] ${
                        active ? "text-white" : "text-white/40"
                      }`}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="mt-0.5 flex-row flex-wrap" style={{ gap }}>
              {feed.map((item) => (
                <Link key={item.key} href={item.href as `/`} asChild>
                  <Pressable
                    style={{ width: cell, height: cell * 1.15 }}
                    accessibilityLabel={item.title}
                  >
                    {item.image ? (
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: "100%", height: "100%" }}
                        contentFit="cover"
                        transition={150}
                      />
                    ) : (
                      <View className="h-full w-full items-center justify-center bg-accent px-2">
                        <Text
                          className="text-center font-[Anton] text-[10px] uppercase tracking-wide text-white"
                          numberOfLines={3}
                        >
                          {item.title}
                        </Text>
                      </View>
                    )}
                    <View className="absolute right-1 top-1 bg-accent px-1">
                      <Text className="font-[Anton] text-[9px] text-white">
                        K
                      </Text>
                    </View>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
