import { useEffect, useRef } from "react";
import { Slot, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavOverlay } from "@/components/SiteNavOverlay";
import { ChromeProvider, useChrome } from "@/lib/chrome";
import { ThemeProvider, useTheme } from "@/lib/theme";

function SiteChrome() {
  const pathname = usePathname();
  const { setScrollY, setMenuOpen } = useChrome();
  const { mode } = useTheme();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setMenuOpen(false);
    setScrollY(0);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname, setMenuOpen, setScrollY]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <View className="relative flex-1 bg-bg">
        <SiteHeader />
        <ScrollView
          ref={scrollRef}
          className="flex-1"
          contentContainerClassName="grow pb-6"
          onScroll={onScroll}
          scrollEventThrottle={32}
          keyboardShouldPersistTaps="handled"
        >
          <Slot />
          <SiteFooter />
        </ScrollView>
        <SiteNavOverlay />
      </View>
    </SafeAreaView>
  );
}

export default function SiteLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ChromeProvider>
          <SiteChrome />
        </ChromeProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
