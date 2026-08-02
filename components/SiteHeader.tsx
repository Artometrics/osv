import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Menu, X } from "lucide-react-native";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";

const NAV = [
  { href: "/blog", label: "Magazine" },
  { href: "/podcast", label: "Podcast" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Membership" },
] as const;

export function SiteHeader() {
  const { menuOpen, setMenuOpen } = useChrome();
  const { colors } = useTheme();

  return (
    <View className="border-b-2 border-border bg-header">
      <Wrapper className="py-3">
        <View className="flex-row items-center justify-between gap-4">
          <Logo />
          <View className="hidden flex-row items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} asChild>
                <Pressable>
                  <Text className="font-[Anton] text-[13px] uppercase tracking-[2px] text-fg">
                    {item.label}
                  </Text>
                </Pressable>
              </Link>
            ))}
            <Link href="/login" asChild>
              <Pressable className="bg-accent px-3 py-2">
                <Text className="font-[Anton] text-[12px] uppercase tracking-[1.5px] text-white">
                  Log in
                </Text>
              </Pressable>
            </Link>
          </View>
          <Pressable
            onPress={() => setMenuOpen(!menuOpen)}
            accessibilityLabel={menuOpen ? "Close menu" : "Open menu"}
            className="p-1 lg:hidden"
          >
            {menuOpen ? (
              <X size={22} color={colors.text} />
            ) : (
              <Menu size={22} color={colors.text} />
            )}
          </Pressable>
        </View>
      </Wrapper>
      {/* Utility bar — magazine instrument strip */}
      <View className="border-t border-border bg-bg">
        <Wrapper className="flex-row flex-wrap items-center justify-between gap-2 py-1.5">
          <Text className="text-[10px] font-bold uppercase tracking-[1.4px] text-subtle">
            Issue · Online
          </Text>
          <Text className="text-[10px] font-bold uppercase tracking-[1.4px] text-accent">
            Dark gothic · Strong graphic content
          </Text>
          <Text className="text-[10px] font-bold uppercase tracking-[1.4px] text-subtle">
            Essays · Interviews · Omen
          </Text>
        </Wrapper>
      </View>
    </View>
  );
}
