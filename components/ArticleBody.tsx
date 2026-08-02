import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import { useTheme } from "@/lib/theme";

export function ArticleBody({ html }: { html: string }) {
  const { width } = useWindowDimensions();
  const { colors, fonts } = useTheme();
  const contentWidth = Math.min(width - 40, 680);

  return (
    <RenderHTML
      contentWidth={contentWidth}
      source={{ html }}
      baseStyle={{
        color: colors.text,
        fontFamily: fonts.sans,
        fontSize: 17,
        lineHeight: 28,
      }}
      tagsStyles={{
        p: { marginBottom: 16 },
        h2: {
          fontFamily: fonts.display,
          fontSize: 28,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginTop: 28,
          marginBottom: 12,
          color: colors.accent,
        },
        h3: {
          fontFamily: fonts.display,
          fontSize: 22,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginTop: 22,
          marginBottom: 10,
          color: colors.text,
        },
        a: { color: colors.accent },
        blockquote: {
          borderLeftWidth: 3,
          borderLeftColor: colors.accent,
          paddingLeft: 16,
          marginVertical: 16,
          color: colors.textMuted,
          fontStyle: "italic",
        },
        li: { marginBottom: 6 },
      }}
    />
  );
}
