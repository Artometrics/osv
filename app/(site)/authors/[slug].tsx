import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { PageSeo } from "@/components/PageSeo";
import { assetUrl } from "@/lib/assets";
import {
  getAuthor,
  getAuthors,
  getBlogPosts,
} from "@/lib/content";
import { paramString } from "@/lib/params";

export async function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.id }));
}

export default function AuthorScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const author = getAuthor(slug);

  if (!author) {
    return (
      <Wrapper className="gap-3 py-10">
        <Text className="font-serif text-[36px] font-light text-fg">
          Author not found
        </Text>
        <Link href="/authors">
          <Text className="text-accent">Back to authors</Text>
        </Link>
      </Wrapper>
    );
  }

  const avatar = assetUrl(
    typeof author.image === "object" ? author.image?.url : author.image,
  );
  const posts = getBlogPosts().filter((p) => p.author === author.id);

  return (
    <>
      <PageSeo
        title={author.name}
        description={author.bio || `${author.name} — Hemingway`}
        path={`/authors/${author.id}`}
        image={
          typeof author.image === "object" ? author.image?.url : undefined
        }
      />
      <Wrapper className="gap-6 py-10">
        <View className="flex-row flex-wrap gap-8">
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              className="h-48 w-48"
              contentFit="cover"
              transition={200}
              accessibilityLabel={author.name}
            />
          ) : null}
          <View className="min-w-[240px] flex-1 gap-2">
            <Text className="font-serif text-4xl font-light text-fg">
              {author.name}
            </Text>
            {author.role ? (
              <Text className="text-sm uppercase tracking-wide text-accent">
                {author.role}
              </Text>
            ) : null}
            {author.bio ? (
              <Text className="mt-2 max-w-[520px] font-sans text-base leading-7 text-muted">
                {author.bio}
              </Text>
            ) : null}
          </View>
        </View>
        {posts.length > 0 ? (
          <View className="gap-2">
            <Text className="font-serif text-2xl font-light text-fg">
              Writing
            </Text>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </View>
        ) : null}
      </Wrapper>
    </>
  );
}
