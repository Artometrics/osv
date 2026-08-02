import { createElement, useEffect, useRef } from "react";
import { View } from "react-native";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  mediaClassName?: string;
  /** If true, only play when mostly in viewport (default true). */
  lazy?: boolean;
};

/**
 * Web looping muted video — autoplay, playsInline, seamless loop.
 * Lazy by default so the page is not decoding a dozen clips at once.
 */
export function LoopVideo({
  src,
  poster,
  className,
  mediaClassName,
  lazy = true,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.loop = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "true");
    el.setAttribute("webkit-playsinline", "true");
    el.setAttribute("muted", "true");

    const play = () => {
      void el.play().catch(() => {});
    };
    const pause = () => {
      el.pause();
    };

    if (!lazy || typeof IntersectionObserver === "undefined") {
      play();
      el.addEventListener("loadeddata", play);
      return () => el.removeEventListener("loadeddata", play);
    }

    const root = wrapRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            if (el.readyState < 2) el.load();
            play();
          } else {
            pause();
          }
        }
      },
      { threshold: [0, 0.2, 0.5], rootMargin: "80px" },
    );
    if (root) io.observe(root);
    else io.observe(el);

    return () => io.disconnect();
  }, [src, lazy]);

  const video = createElement("video", {
    ref,
    src,
    poster,
    autoPlay: !lazy,
    muted: true,
    loop: true,
    playsInline: true,
    controls: false,
    preload: lazy ? "metadata" : "auto",
    "aria-hidden": true,
    className: ["osv-loop-video", mediaClassName].filter(Boolean).join(" "),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
  });

  // Outer DOM wrap gives IntersectionObserver a stable box on RN Web.
  const wrap = createElement(
    "div",
    {
      ref: wrapRef,
      className: "osv-loop-wrap",
      style: { width: "100%", height: "100%", position: "relative" },
    },
    video,
  );

  return (
    <View
      className={["overflow-hidden bg-black", className].filter(Boolean).join(" ")}
      style={{ minHeight: 1 }}
    >
      {wrap}
    </View>
  );
}
