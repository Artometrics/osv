import { Text } from "react-native";
import { Link } from "expo-router";

export function Logo({
  className,
  variant = "display",
}: {
  className?: string;
  variant?: "display" | "gothic" | "mark";
}) {
  const base =
    variant === "gothic"
      ? "font-[UnifrakturCook] text-3xl text-accent"
      : variant === "mark"
        ? "font-[Anton] text-sm uppercase tracking-[3px] text-fg"
        : "font-[Anton] text-2xl uppercase tracking-[2px] text-fg";

  return (
    <Link href="/" asChild>
      <Text
        accessibilityRole="header"
        className={[base, className].filter(Boolean).join(" ")}
      >
        {variant === "gothic" ? "osv" : "OSV"}
      </Text>
    </Link>
  );
}
