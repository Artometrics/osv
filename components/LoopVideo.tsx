import { View } from "react-native";
import { Image } from "expo-image";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Extra style for the absolute fill media */
  mediaClassName?: string;
};

/**
 * Native fallback — poster still. Motion loops play on web via LoopVideo.web.tsx.
 */
export function LoopVideo({ poster, src, className, mediaClassName }: Props) {
  const still = poster || src.replace("/videos/brand/", "/images/brand/").replace(/\.mp4$/, ".png");
  return (
    <View className={["overflow-hidden bg-black", className].filter(Boolean).join(" ")}>
      <Image
        source={{ uri: still }}
        className={["absolute inset-0 h-full w-full", mediaClassName]
          .filter(Boolean)
          .join(" ")}
        contentFit="cover"
      />
    </View>
  );
}
