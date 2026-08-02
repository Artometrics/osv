import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";

export default function AboutScreen() {
  return (
    <>
      <PageSeo
        title="About"
        description="OSV — dark gothic magazine. Essays, interviews, cultural signal."
        path="/about"
      />
      <View className="border-b-2 border-border bg-accent px-0 py-10">
        <Wrapper>
          <Text className="font-[GreatVibes] text-4xl text-black">About</Text>
          <Text className="mt-2 max-w-[14ch] font-[Anton] text-5xl uppercase leading-[0.95] tracking-[1px] text-black md:text-7xl">
            Soft things in hard places
          </Text>
        </Wrapper>
      </View>
      <Wrapper className="gap-6 py-10">
        <View className="flex-row flex-wrap gap-6">
          <Image
            source={{ uri: "/images/brand/armor-lamb.png" }}
            className="aspect-[3/4] w-full max-w-[360px] border-2 border-border"
            contentFit="cover"
          />
          <View className="min-w-[260px] flex-1 gap-4">
            <Text className="font-[Anton] text-3xl uppercase leading-[0.95] tracking-[1px] text-fg">
              Fog, iron, omen.
            </Text>
            <Text className="font-sans text-base leading-7 text-muted">
              OSV is a dark gothic magazine — hyperreal stills, chrome-anime
              flashes, and writing that stares back. Essays and interviews share
              one voice: clear, sharp, no comfort padding.
            </Text>
            <Text className="font-sans text-base leading-7 text-muted">
              Character imagery is cast with the KSM Soul on Higgsfield;
              landscapes and illustrations push the same desaturated, high-
              contrast world.
            </Text>
          </View>
        </View>
      </Wrapper>
    </>
  );
}
