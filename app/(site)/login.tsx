import { Pressable, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";

export default function LoginScreen() {
  return (
    <Wrapper variant="narrow" className="gap-4 py-10">
      <PageSeo title="Log in" path="/login" />
      <Text className="font-serif text-4xl font-light text-fg">Log in</Text>
      <Text className="font-sans text-base text-muted">
        Access member essays and full podcast transcripts.
      </Text>
      <View className="mt-4 gap-3">
        <TextInput
          placeholder="Email"
          placeholderTextColor="#737373"
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-border bg-bg-elevated px-4 py-3 font-sans text-base text-fg"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#737373"
          secureTextEntry
          className="border border-border bg-bg-elevated px-4 py-3 font-sans text-base text-fg"
        />
        <Pressable className="self-start bg-fg px-5 py-3">
          <Text className="text-xs font-medium uppercase tracking-wide text-inverse">
            Continue
          </Text>
        </Pressable>
      </View>
      <Text className="mt-2 text-sm text-muted">
        No account?{" "}
        <Link href="/signup">
          <Text className="text-accent">Sign up</Text>
        </Link>
      </Text>
    </Wrapper>
  );
}
