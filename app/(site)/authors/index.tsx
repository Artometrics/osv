import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { assetUrl } from "@/lib/assets";
import { getAuthors } from "@/lib/content";

export default function AuthorsIndex() {
  const authors = getAuthors();

  return (
    <Wrapper className="gap-3 py-10">
      <PageSeo
        title="Authors"
        description="The writers and hosts behind Hemingway."
        path="/authors"
      />
      <Text className="text-xs font-medium uppercase tracking-[1.8px] text-accent">
        People
      </Text>
      <Text className="font-serif text-[40px] font-light tracking-tight text-fg">
        Authors
      </Text>
      <View className="mt-4 flex-row flex-wrap gap-6">
        {authors.map((author) => {
          const avatar = assetUrl(
            typeof author.image === "object" ? author.image?.url : author.image,
          );
          return (
            <Link key={author.id} href={`/authors/${author.id}` as `/authors/${string}`} asChild>
              <Pressable className="min-w-[200px] flex-1 gap-3 border-b border-border pb-4">
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    className="aspect-square w-full max-w-[220px]"
                    contentFit="cover"
                    transition={200}
                    accessibilityLabel={author.name}
                  />
                ) : null}
                <Text className="font-serif text-xl font-light text-fg">
                  {author.name}
                </Text>
                {author.role ? (
                  <Text className="text-sm text-muted">{author.role}</Text>
                ) : null}
              </Pressable>
            </Link>
          );
        })}
      </View>
    </Wrapper>
  );
}
