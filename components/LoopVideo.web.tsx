import { createElement, useEffect, useRef } from "react";
import { View } from "react-native";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  mediaClassName?: string;
};

/**
 * Web looping muted video — autoplay, playsInline, seamless loop.
 */
export function LoopVideo({ src, poster, className, mediaClassName }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");
    const play = () => {
      void el.play().catch(() => {});
    };
    play();
    el.addEventListener("canplay", play);
    return () => el.removeEventListener("canplay", play);
  }, [src]);

  const video = createElement("video", {
    ref,
    src,
    poster,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    preload: "auto",
    "aria-hidden": true,
    className: ["osv-loop-video", mediaClassName].filter(Boolean).join(" "),
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  });

  return (
    <View className={["overflow-hidden bg-black", className].filter(Boolean).join(" ")}>
      {video}
    </View>
  );
}
