import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";

const PLANS = [
  {
    name: "Reader",
    price: "Free",
    detail: "Public magazine essays and episode teasers.",
  },
  {
    name: "Member",
    price: "$9/mo",
    detail: "Locked essays, full transcripts, and member-only drops.",
  },
  {
    name: "Studio",
    price: "$29/mo",
    detail: "Everything in Member plus early access and guest notes.",
  },
] as const;

export default function PricingScreen() {
  return (
    <Wrapper className="gap-4 py-10">
      <PageSeo
        title="Membership"
        description="Support Hemingway and unlock the full archive."
        path="/pricing"
      />
      <Text className="text-xs font-medium uppercase tracking-[1.8px] text-accent">
        Membership
      </Text>
      <Text className="font-serif text-[40px] font-light tracking-tight text-fg">
        Choose a plan
      </Text>
      <Text className="mb-4 max-w-[560px] font-sans text-[17px] leading-[26px] text-muted">
        Free reading stays free. Membership unlocks the locked archive and full
        interview transcripts.
      </Text>
      <View className="flex-row flex-wrap gap-5">
        {PLANS.map((plan) => (
          <View
            key={plan.name}
            className="min-w-[240px] flex-1 gap-3 border border-border p-6"
          >
            <Text className="text-xs font-medium uppercase tracking-wide text-accent">
              {plan.name}
            </Text>
            <Text className="font-serif text-3xl font-light text-fg">
              {plan.price}
            </Text>
            <Text className="font-sans text-sm leading-6 text-muted">
              {plan.detail}
            </Text>
            <Link href="/signup" asChild>
              <Pressable className="mt-2 self-start bg-fg px-4 py-2.5">
                <Text className="text-xs font-medium uppercase tracking-wide text-inverse">
                  Get started
                </Text>
              </Pressable>
            </Link>
          </View>
        ))}
      </View>
    </Wrapper>
  );
}
