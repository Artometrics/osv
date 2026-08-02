import { View, type StyleProp, type ViewStyle } from "react-native";

type Variant = "standard" | "narrow" | "prose" | "wide" | "bleed";

const variantClass: Record<Variant, string> = {
  wide: "w-full max-w-[1400px] self-center px-5",
  standard: "w-full max-w-[1200px] self-center px-5",
  narrow: "w-full max-w-[720px] self-center px-5",
  prose: "w-full max-w-[680px] self-center px-5",
  bleed: "w-full self-center",
};

export function Wrapper({
  children,
  variant = "standard",
  style,
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  className?: string;
}) {
  return (
    <View
      className={[variantClass[variant], className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </View>
  );
}
