import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { assetUrl } from "@/lib/assets";

const PLATES = [
  {
    src: "/sources/raven.jpg",
    title: "The Raven, 1884",
    credit:
      "Illustration for Edgar Allan Poe’s The Raven. Engraving by Gustave Doré. Public domain. Via Wikimedia Commons.",
    href: "https://commons.wikimedia.org/wiki/File:Dore_The_Raven_1884-15.jpg",
  },
  {
    src: "/sources/charon.jpg",
    title: "Charon, Inferno Canto III",
    credit:
      "Charon on the river Acheron. Engraving by Gustave Doré for Dante’s Inferno. Public domain. Via Wikimedia Commons.",
    href: "https://commons.wikimedia.org/wiki/File:Gustave_Dor%C3%A9_-_Dante_Alighieri_-_Inferno_-_Plate_9_(Canto_III_-_Charon).jpg",
  },
  {
    src: "/sources/paradise-lost-10.jpg",
    title: "Paradise Lost",
    credit:
      "Illustration for John Milton’s Paradise Lost. Engraving by Gustave Doré. Public domain. Via Wikimedia Commons.",
    href: "https://commons.wikimedia.org/wiki/File:Paradise_Lost_10.jpg",
  },
] as const;

export default function SourcesScreen() {
  return (
    <>
      <PageSeo
        title="Sources"
        description="Public-domain engravings hosted for OSV, with credits and a downloadable copy of each file."
        path="/sources"
      />
      <View className="border-b-2 border-border bg-accent px-0 py-10">
        <Wrapper>
          <Text className="font-[GreatVibes] text-4xl text-black">Sources</Text>
          <Text className="mt-2 max-w-[16ch] font-[Anton] text-5xl uppercase leading-[0.95] tracking-[1px] text-black md:text-7xl">
            Public domain, credited
          </Text>
        </Wrapper>
      </View>
      <Wrapper className="gap-8 py-10">
        <Text className="max-w-[62ch] font-sans text-base leading-7 text-muted">
          These Gustave Doré engravings are in the public domain. OSV hosts
          copies so the magazine can show them with a caption and so you can
          download the same files. The canonical images stay on Wikimedia
          Commons. Brand loops on the rest of the site are original OSV work,
          listed in the brand video manifest, and are not public-domain.
        </Text>
        <Text className="font-sans text-base leading-7 text-muted">
          Downloads:{" "}
          <Link href={"/downloads/osv-sources.zip" as any}>
            <Text className="text-accent underline">osv-sources.zip</Text>
          </Link>
          {" · "}
          <Link href={"/sources/CREDITS.md" as any}>
            <Text className="text-accent underline">CREDITS.md</Text>
          </Link>
          {" · "}
          <Link href={"/sources/credits.json" as any}>
            <Text className="text-accent underline">credits.json</Text>
          </Link>
        </Text>
        <View className="gap-10">
          {PLATES.map((plate) => {
            const uri = assetUrl(plate.src);
            return (
              <View key={plate.src} className="gap-3">
                {uri ? (
                  <Image
                    source={{ uri }}
                    className="w-full max-w-[720px] border-2 border-border"
                    style={{ aspectRatio: 3 / 4, width: "100%" }}
                    contentFit="contain"
                    transition={200}
                  />
                ) : null}
                <Text className="font-[Anton] text-2xl uppercase tracking-[1px] text-fg">
                  {plate.title}
                </Text>
                <Text className="max-w-[62ch] font-sans text-sm leading-6 text-muted">
                  {plate.credit}{" "}
                  <Link href={plate.href as any}>
                    <Text className="text-accent underline">Commons file</Text>
                  </Link>
                </Text>
              </View>
            );
          })}
        </View>
      </Wrapper>
    </>
  );
}
