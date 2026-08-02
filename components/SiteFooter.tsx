import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";

const COLUMNS = [
  {
    title: "Read",
    links: [
      ["/blog", "Magazine"],
      ["/podcast", "Podcast"],
      ["/authors", "Authors"],
      ["/about", "About"],
    ],
  },
  {
    title: "Join",
    links: [
      ["/pricing", "Membership"],
      ["/login", "Log in"],
      ["/signup", "Sign up"],
      ["/contact", "Contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["/legal/privacy", "Privacy"],
      ["/legal/terms", "Terms"],
      ["/legal/cookies", "Cookies"],
      ["/legal/ethics-statement", "Ethics"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <View className="mt-0">
      <View className="bg-accent px-0 py-12">
        <Wrapper className="flex-row flex-wrap items-end justify-between gap-6">
          <View className="min-w-[220px] flex-1 gap-2">
            <Text className="font-[GreatVibes] text-3xl text-black">
              Issue online
            </Text>
            <Text className="font-[Anton] text-5xl uppercase leading-[0.95] tracking-[2px] text-black">
              {"Let's make\nsomething\nloud."}
            </Text>
          </View>
          <Link href="/signup" asChild>
            <Pressable className="border-2 border-black bg-black px-6 py-4">
              <Text className="font-[Anton] text-sm uppercase tracking-[2px] text-white">
                Join →
              </Text>
            </Pressable>
          </Link>
        </Wrapper>
      </View>
      <View className="bg-black py-10">
        <Wrapper>
          <View className="flex-row flex-wrap gap-8">
            {COLUMNS.map((col) => (
              <View key={col.title} className="min-w-[140px] flex-grow gap-2">
                <Text className="mb-1.5 font-[Anton] text-[12px] uppercase tracking-[2px] text-accent">
                  {col.title}
                </Text>
                {col.links.map(([href, label]) => (
                  <Link key={href} href={href as `/blog`} asChild>
                    <Pressable>
                      <Text className="py-0.5 text-[13px] uppercase tracking-wide text-white/75">
                        {label}
                      </Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
            ))}
          </View>
          <View className="mt-10 flex-row flex-wrap items-end justify-between gap-4 border-t border-white/20 pt-6">
            <Text className="font-[UnifrakturCook] text-4xl text-accent">
              osv
            </Text>
            <Text className="text-[11px] uppercase tracking-[1.4px] text-white/40">
              © {new Date().getFullYear()} OSV · Essays · Interviews · Signal
            </Text>
          </View>
        </Wrapper>
      </View>
    </View>
  );
}
