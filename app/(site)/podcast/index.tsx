import { Text, View } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { PodcastCard } from "@/components/PodcastCard";
import { PageSeo } from "@/components/PageSeo";
import { getPodcastEpisodes } from "@/lib/content";

export default function PodcastIndex() {
  const episodes = getPodcastEpisodes();

  return (
    <>
      <PageSeo
        title="Podcast"
        description="Interviews with design engineers and creative technologists."
        path="/podcast"
      />
      <View className="border-b-2 border-border bg-accent py-10">
        <Wrapper>
          <Text className="font-[GreatVibes] text-4xl text-black">Listen</Text>
          <Text className="font-[Anton] text-5xl uppercase tracking-[2px] text-black md:text-7xl">
            Podcast
          </Text>
          <Text className="mt-3 max-w-[40ch] font-sans text-[15px] leading-6 text-black/75">
            Long-form conversations with the people shaping digital products.
          </Text>
        </Wrapper>
      </View>
      <Wrapper className="gap-0 py-2">
        {episodes.map((ep) => (
          <PodcastCard key={ep.id} episode={ep} />
        ))}
      </Wrapper>
    </>
  );
}
