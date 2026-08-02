import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { useChrome } from "@/lib/chrome";

const LINKS = [
  { href: "/blog", label: "Magazine" },
  { href: "/podcast", label: "Podcast" },
  { href: "/authors", label: "Authors" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Membership" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Log in" },
  { href: "/signup", label: "Sign up" },
] as const;

export function SiteNavOverlay() {
  const { menuOpen, setMenuOpen } = useChrome();
  if (!menuOpen) return null;

  return (
    <View className="absolute inset-0 z-50 bg-black lg:hidden">
      <Wrapper className="gap-0 pt-24">
        {LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            asChild
            onPress={() => setMenuOpen(false)}
          >
            <Pressable className="border-b border-white/20 py-5">
              <Text className="font-[Anton] text-4xl uppercase tracking-[2px] text-white">
                {item.label}
              </Text>
            </Pressable>
          </Link>
        ))}
        <Text className="mt-8 font-[GreatVibes] text-3xl text-accent">
          osv
        </Text>
      </Wrapper>
    </View>
  );
}
