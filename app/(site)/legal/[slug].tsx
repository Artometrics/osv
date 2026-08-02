import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { PageSeo } from "@/components/PageSeo";
import {
  formatDate,
  getLegalPage,
  getLegalPages,
} from "@/lib/content";
import { paramString } from "@/lib/params";

export async function generateStaticParams() {
  return getLegalPages().map((p) => ({ slug: p.id }));
}

export default function LegalScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const page = getLegalPage(slug);

  if (!page) {
    return (
      <Wrapper className="gap-3 py-10">
        <Text className="font-serif text-[36px] font-light text-fg">
          Page not found
        </Text>
        <Link href="/">
          <Text className="text-accent">Return home</Text>
        </Link>
      </Wrapper>
    );
  }

  return (
    <>
      <PageSeo
        title={page.page}
        description={`${page.page} — Hemingway legal`}
        path={`/legal/${page.id}`}
      />
      <Wrapper variant="prose" className="gap-4 py-10">
        <Text className="text-xs font-medium uppercase tracking-[1.8px] text-accent">
          Legal
        </Text>
        <Text className="font-serif text-4xl font-light text-fg">
          {page.page}
        </Text>
        {page.pubDate ? (
          <Text className="text-xs text-subtle">
            Updated {formatDate(page.pubDate)}
          </Text>
        ) : null}
        <View className="mt-4">
          <ArticleBody html={page.body} />
        </View>
      </Wrapper>
    </>
  );
}
