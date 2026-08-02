import { Text, View } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { PageSeo } from "@/components/PageSeo";
import { getBlogPosts } from "@/lib/content";

export default function BlogIndex() {
  const posts = getBlogPosts();

  return (
    <>
      <PageSeo
        title="Magazine"
        description="Essays and interviews on design, systems, and craft."
        path="/blog"
      />
      <View className="border-b-2 border-border bg-black py-10">
        <Wrapper>
          <Text className="font-[GreatVibes] text-3xl text-accent">Archive</Text>
          <Text className="font-[Anton] text-5xl uppercase tracking-[2px] text-white md:text-7xl">
            Magazine
          </Text>
          <Text className="mt-3 max-w-[40ch] font-sans text-[15px] leading-6 text-white/70">
            Essays and interviews on design systems, UI patterns, and the craft
            of building products.
          </Text>
        </Wrapper>
      </View>
      <Wrapper className="gap-0 py-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} variant="row" />
        ))}
      </Wrapper>
    </>
  );
}
